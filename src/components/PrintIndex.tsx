import * as React from 'react'

import Check from './Check';
import CheckBack from './CheckBack';

const PAPER_SIZE = {
  'LETTER': [8.5, 11],
  'A4': [8.27, 11.69],
};

const PAPER_PADDING = 0.5;

const CHECK_WIDTH = 6;
const CHECK_WIDTH_PIXEL = 1540;

interface IPrintIndexProps {
  isCheckFront: boolean;
  args?: any;
}

export function PrintContent({ isCheckFront, args }: IPrintIndexProps) {
  const checkPixelWidth = CHECK_WIDTH * args.dpi;
  const scale = args.preview ? 1 : checkPixelWidth / CHECK_WIDTH_PIXEL;

  if (isCheckFront) {
    args.amount = parseFloat(args.amount);
    args.date = new Date(args.date);
    args.routingNumber = parseInt(args.routingNumber);
    args.accountNumber = parseInt(args.accountNumber);
    args.checkNumber = parseInt(args.checkNumber);
    return (
      <Check {...args!} scale={scale} />
    );
  } else {
    return (
      <CheckBack />
    );
  }
}

export default function PrintIndex({ isCheckFront, args }: IPrintIndexProps) {
  const pageStyle = {
    width: PAPER_SIZE[args.paper][0] * args.dpi,
    height: PAPER_SIZE[args.paper][1] * args.dpi,
    paddingTop: `${PAPER_PADDING * args.dpi}px`,
  };

  // process custom css
  if (args.themeCSS) {
    const styleBlock = document.createElement('link');
    styleBlock.rel = 'stylesheet';
    styleBlock.href = args.themeCSS;
    document.head.append(styleBlock);
  }

  if (args.preview) {
    return (<PrintContent isCheckFront={isCheckFront} args={args} />);
  } else {
    return (
      <div className="print-paper" style={pageStyle}>
        <PrintContent isCheckFront={isCheckFront} args={args} />
      </div>
    );
  }
}
