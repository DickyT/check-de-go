import * as React from 'react';
import {
  useCallback, useEffect, useRef, useImperativeHandle, useMemo,
} from 'react';
import * as NumberToWords from 'number-to-words';
import BigNumber from 'bignumber.js';

import { usePromise } from './utils';

const CHECK_WIDTH = 900;
const CHECK_HEIGHT = 350;

const FONTS = [
  {
    name: 'MICR',
    url: 'https://raw.githubusercontent.com/garily/check-de-go/master/src/static/micrenc.ttf',
  },
  {
    name: 'Spoqa Han Sans Neo Regular',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/spoqa-han-sans/3.2.1/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.ttf',
  },
  {
    name: 'Spoqa Han Sans Neo Medium',
    url: 'https://cdnjs.cloudflare.com/ajax/libs/spoqa-han-sans/3.2.1/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Medium.ttf',
  },
  {
    name: 'Roboto Mono',
    url: 'https://fonts.cdnfonts.com/s/16061/RobotoMono-Regular.woff',
  },
].map(({ name, url }) => new FontFace(name, `url('${url}')`));

interface CheckAddress {
  name: string;
  line1?: string;
  line2?: string;
  line3?: string;
}

interface Props {
  // render settings
  previewMode?: boolean;
  scale?: number;
  bg?: string;
  logo?: string;
  // check info
  amount: BigNumber;
  issueDate: string;
  routingNumber: string;
  accountNumber: string;
  checkNumber: string;
  memo?: string;
  senderAddress: CheckAddress;
  receiverAddress: CheckAddress;
  bankAddress?: CheckAddress;
  expireDays?: number;
  className?: string;
}

export default React.forwardRef(({
  previewMode = false,
  scale = 1,
  bg,
  logo,
  amount,
  issueDate,
  routingNumber,
  accountNumber,
  checkNumber,
  memo,
  senderAddress,
  receiverAddress,
  bankAddress,
  expireDays,
  className,
}: Props, ref) => {
  const bgImg = usePromise(loadImg, bg);
  const logoImg = usePromise(loadImg, logo);
  usePromise(loadFonts);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const unit = useCallback((val) => scale * val, [scale]);
  const getContext = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas!.getContext('2d')!;
  }, []);

  const pixelRatio = previewMode ? window.devicePixelRatio : 1;

  const width = unit(CHECK_WIDTH);
  const canvasWidth = width * pixelRatio;

  const height = unit(CHECK_HEIGHT);
  const canvasHeight = height * pixelRatio;

  const refHandle = useMemo(() => () => ({
    width,
    height,
    scale,
    canvas: canvasRef.current!,
    context: getContext(),
  }), [getContext, height, scale, width]);
  useImperativeHandle(ref, refHandle);

  useEffect(() => {
    const ctx = getContext();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(pixelRatio, pixelRatio);

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (bgImg) {
      const bgImgRatio = width / bgImg.width;
      ctx.drawImage(
        bgImg,
        0,
        0,
        bgImg.width,
        bgImg.height,
        0,
        0,
        bgImg.width * bgImgRatio,
        bgImg.height * bgImgRatio,
      );
    }

    ((x: number, y: number, w: number, h: number, radius: number) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fill();
    })(unit(10), unit(10), width - unit(20), height - unit(20), unit(15));

    if (logoImg) {
      const logoImgRatio = unit(200) / logoImg.width;
      ctx.drawImage(
        logoImg,
        0,
        0,
        logoImg.width,
        logoImg.height,
        width / 2 - (logoImg.width * logoImgRatio) / 2,
        unit(25),
        logoImg.width * logoImgRatio,
        logoImg.height * logoImgRatio,
      );
    }

    ctx.fillStyle = 'black';

    ctx.textBaseline = 'middle';

    ctx.textAlign = 'start';
    ctx.font = `${unit(13)}px 'Spoqa Han Sans Neo Regular'`;
    ctx.fillText('PAY EXACTLY', unit(30), unit(125));

    const amountInt = amount.integerValue(BigNumber.ROUND_FLOOR);
    const dollarEnglish = NumberToWords.toWords(amountInt.toNumber())
      .replaceAll(',', '')
      .toUpperCase();

    ctx.font = `${unit(15)}px 'Spoqa Han Sans Neo Medium'`;
    const amountCents = amount.minus(amountInt).multipliedBy('100').toFormat();
    ctx.fillText(
      `** ${dollarEnglish} AND ${amountCents}/100 US Dollars **`,
      unit(130),
      unit(125),
    );

    ctx.font = `${unit(20)}px 'Roboto Mono'`;
    ctx.textAlign = 'end';
    ctx.fillText(`** $${amount.toFormat()} **`, width - unit(30), unit(155));

    if (bankAddress) {
      ctx.font = `${unit(13)}px 'Spoqa Han Sans Neo Medium'`;
      ctx.fillText(bankAddress.name, width - unit(30), unit(185));

      ctx.font = `${unit(13)}px 'Spoqa Han Sans Neo Regular'`;
      bankAddress.line1 != null
        && ctx.fillText(bankAddress.line1, width - unit(30), unit(200));
      bankAddress.line2 != null
        && ctx.fillText(bankAddress.line2, width - unit(30), unit(215));
    }

    ctx.textAlign = 'center';
    ctx.font = `${unit(13)}px 'Spoqa Han Sans Neo Regular'`;
    ctx.fillText('TO THE', unit(65), unit(165));
    ctx.fillText('ORDER OF', unit(65), unit(185));

    ctx.textAlign = 'start';
    ctx.font = `${unit(20)}px 'Spoqa Han Sans Neo Medium'`;
    ctx.fillText(receiverAddress.name, unit(130), unit(175));

    ctx.font = `${unit(13)}px 'Spoqa Han Sans Neo Regular'`;
    receiverAddress.line1 != null
      && ctx.fillText(receiverAddress.line1, unit(130), unit(200));
    receiverAddress.line2 != null
      && ctx.fillText(receiverAddress.line2, unit(130), unit(215));
    receiverAddress.line3 != null
      && ctx.fillText(receiverAddress.line3, unit(130), unit(230));

    ctx.font = `${unit(13)}px 'Spoqa Han Sans Neo Medium'`;
    ctx.fillText(senderAddress.name, unit(30), unit(30));

    ctx.font = `${unit(13)}px 'Spoqa Han Sans Neo Regular'`;
    senderAddress.line1 != null
      && ctx.fillText(senderAddress.line1, unit(30), unit(50));
    senderAddress.line2 != null
      && ctx.fillText(senderAddress.line2, unit(30), unit(65));
    senderAddress.line3 != null
      && ctx.fillText(senderAddress.line3, unit(30), unit(80));

    ctx.font = `${unit(13)}px 'Spoqa Han Sans Neo Medium'`;
    memo != null && ctx.fillText(memo, unit(50), height - unit(75));

    ctx.beginPath();
    ctx.moveTo((width / 3) * 2, height - unit(70));
    ctx.lineTo(width - unit(30), height - unit(70));
    ctx.lineWidth = unit(1);
    ctx.stroke();

    ctx.font = `${unit(13)}px 'Spoqa Han Sans Neo Medium'`;
    ctx.textAlign = 'end';
    ctx.fillText('DATE', width - unit(125), unit(30));
    ctx.fillText('CHECK #', width - unit(125), unit(50));

    ctx.font = `${unit(13)}px 'Roboto Mono'`;
    ctx.textAlign = 'start';
    ctx.fillText(issueDate, width - unit(115), unit(30));
    ctx.fillText(checkNumber, width - unit(115), unit(50));

    ctx.font = `${unit(13)}px 'Spoqa Han Sans Neo Medium'`;
    ctx.textAlign = 'end';
    expireDays != null
      && ctx.fillText(`VOID AFTER ${expireDays} DAYS`, width - unit(37), unit(85));

    ((x: number, y: number, w: number, h: number, radius: number) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fill();
    })(
      unit(10),
      height - unit(50),
      width - unit(20),
      unit(50) - unit(10),
      unit(15),
    );

    ctx.font = `${unit(35)}px MICR`;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'ideographic';
    ctx.fillText(
      `C${checkNumber}C A${routingNumber}A ${accountNumber}C`,
      width / 2,
      height - unit(20),
    );
  }, [
    accountNumber,
    amount,
    bankAddress,
    bgImg,
    canvasHeight,
    canvasWidth,
    checkNumber,
    expireDays,
    getContext,
    height,
    issueDate,
    logoImg,
    memo,
    receiverAddress.line1,
    receiverAddress.line2,
    receiverAddress.line3,
    receiverAddress.name,
    routingNumber,
    senderAddress.line1,
    senderAddress.line2,
    senderAddress.line3,
    senderAddress.name,
    unit,
    width,
    pixelRatio,
  ]);

  return (
    <canvas
      className={className}
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      style={{ width, height }}
    />
  );
});

function loadImg(url?: string): Promise<HTMLImageElement | undefined> {
  return new Promise((resolve, reject) => {
    if (url == null) {
      resolve(undefined);
      return;
    }
    const imgLoader = new Image();
    imgLoader.crossOrigin = 'anonymous';
    imgLoader.onload = () => resolve(imgLoader);
    imgLoader.onerror = () => reject();
    imgLoader.src = url;
  });
}

function loadFonts(): Promise<void> {
  return new Promise((resolve, reject) => {
    const loadedFonts = FONTS.reduce(
      (acc, font) => acc + (font.status === 'loaded' ? 1 : 0),
      0,
    );
    if (loadedFonts < FONTS.length) {
      let loadedCount = 0;
      FONTS.forEach((fontFace) => fontFace
        .load()
        .then((font) => {
          document.fonts.add(font);
          loadedCount += 1;
          if (loadedCount === FONTS.length) {
            resolve();
          }
        })
        .catch(() => reject()));
    } else {
      resolve();
    }
  });
}
