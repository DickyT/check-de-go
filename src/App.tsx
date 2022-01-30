import * as React from 'react';
import BigNumber from 'bignumber.js';

import CheckCanvas from './CheckCanvas';
import './App.css';
// import { jsPDF } from 'jspdf';

// const CHECK_WIDTH_INCH = 8;

// const DPI = 300;

/* <button
        type="button"
        onClick={() => {
          // eslint-disable-next-line new-cap
          const doc = new jsPDF('p', 'in', [8.5, 11]);

          doc.addImage(canvasRef.current!, 'png', 0.25, 0.5, 8, 3.11);
          doc.setLineDashPattern([0.1], 2);
          doc.setLineWidth(0.01);
          doc.line(0, 0.5, 8.5, 0.5);
          doc.line(0, 3.61, 8.5, 3.61);
          doc.line(0.25, 0, 0.25, 11);
          doc.line(8.5 - 0.25, 0, 8.5 - 0.25, 11);
          doc.save('letter.pdf');
        }}
      >
        save
      </button> */

export default function App() {
  return (
    <div className="container">
      <main>
        <div className="py-3 text-center">
          <div className="home-logo">
            <i className="fas fa-money-check-alt fa-5x" />
            <span className="title">Check de Go v2</span>
            <a href="https://github.com/DickyT/check-de-go/" className="github-badge" target="_blank" rel="noreferrer">
              <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/DickyT/check-de-go?style=social" />
            </a>
          </div>
          <p className="lead">Generate and print your check with few clicks</p>
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
                amount={new BigNumber(114514.19)}
                issueDate="07/01/2003"
                routingNumber="325070760"
                accountNumber="1145141919"
                checkNumber="810"
                memo="TESLA TO THE MOON 🚀 (SAMPLE CHECK DO NOT DEPOSIT)"
                logo="https://i.imgur.com/vwqVHT3.png"
                bg="https://i.imgur.com/PrAofVk.png"
                senderAddress={{
                  name: 'TESLA INC.',
                  line1: 'TESLA HEADQUARTERS',
                  line2: '3500 DEER CREEK RD',
                  line3: 'PALO ALTO, CA 94304',
                }}
                receiverAddress={{
                  name: 'ELON MUSK',
                  line1: 'TESLA GIGA TEXAS',
                  line2: '13101 HAROLD GREEN RD',
                  line3: 'AUSTIN, TX 78725',
                }}
                bankAddress={{
                  name: 'BANK OF TOKYO-MITSUBISHI UFJ',
                  // line1: '1909 K ST NW',
                  // line2: 'WASHINGTON, DC 20006',
                }}
                expireDays={180}
                previewMode={true}
              />
            </div>
          </React.Suspense>
        </div>
      </main>
    </div>
  );
}
