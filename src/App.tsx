import React, { useState } from 'react';

import CheckCanvas, { CheckInfo } from './CheckCanvas';
import CheckSettings from './CheckSettings';
import './App.css';
import { useDebounce } from './utils';
import PrintSettings from './PrintSettings';

export default function App() {
  const [renderOptions, setRenderOptions] = useState<CheckInfo>({
    amount: '114514.19',
    issueDate: '07/01/2003',
    routingNumber: '026009632',
    accountNumber: '1145141919',
    checkNumber: '810',
    memo: 'TESLA TO THE MOON 🚀 (SAMPLE CHECK DO NOT DEPOSIT)',
    senderAddress: {
      name: 'TESLA INC.',
      line1: 'TESLA HEADQUARTERS',
      line2: '3500 DEER CREEK RD',
      line3: 'PALO ALTO, CA 94304',
    },
    receiverAddress: {
      name: 'ELON MUSK',
      line1: 'TESLA GIGA TEXAS',
      line2: '13101 HAROLD GREEN RD',
      line3: 'AUSTIN, TX 78725',
    },
    bankAddress: {
      name: '',
      line1: '',
      line2: '',
      line3: '',
    },
    expireDays: 180,
    logo: 'https://i.imgur.com/vwqVHT3.png',
    bg: 'https://i.imgur.com/PrAofVk.png',
  });
  const previewRenderOptions = useDebounce(renderOptions, 500);

  return (
    <>
      <main>
        <div className="app-header text-center">
          <div className="home-logo">
            <i className="fas fa-money-check-alt fa-5x" />
            <div className="right-text">
              <span className="title">Check de Go v2</span>
              <span className="subtitle">
                Yet another check generation tool
                <a href="https://github.com/DickyT/check-de-go/" className="github-badge" target="_blank" rel="noreferrer">
                  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/DickyT/check-de-go?style=social" />
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="main-content">
          <React.Suspense
            fallback={(
              <div className="loading">
                <img src="https://i.stack.imgur.com/kOnzy.gif" alt="" />
                <span className="loading-text">Reloading Data</span>
              </div>
            )}
          >
            <div className="preview">
              <CheckCanvas
                className="check-canvas"
                scale={0.8}
                previewMode={true}
                {...previewRenderOptions}
              />
            </div>
            <hr />
            <CheckSettings value={renderOptions} onChange={setRenderOptions} />
            <hr />
            <PrintSettings renderOptions={renderOptions} />
          </React.Suspense>
        </div>
      </main>
      <footer className="my-5 pt-5 text-muted text-center text-small">
        <p className="mb-1">Check de Go is provided under GNU General Public License.</p>
      </footer>
    </>
  );
}
