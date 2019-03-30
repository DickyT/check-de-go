import * as React from 'react';
import * as NumberToWords from 'number-to-words';

export interface ICheckProps {
  payerName: string;
  payerAddressLine1: string;
  payerAddressLine2: string;
  payeeName: string;
  amount?: number;
  date: Date;
  bankName: string;
  bankAddress?: string;
  routingNumber: string;
  accountNumber: string;
  checkNumber: string;
  memo?: string;
  scale: number;
}

interface ICheckState {

}

export default class Check extends React.Component<ICheckProps, ICheckState> {
  render() {
    let amount = -1;
    let amountEnglish = '';
    let numbericAmountstyle: { width?: string } = {
      width: '400px',
    };
    if (this.props.amount) {
      amount = parseFloat(this.props.amount.toFixed(2));
      const amountInt = parseInt(this.props.amount.toFixed(2), 10);
      const amountDecimalNumbers = amount - amountInt;
      const amountNumerator = parseInt((amountDecimalNumbers * 100).toString(), 10);
      amountEnglish = `${NumberToWords.toWords(amountInt)} AND ${amountNumerator}/100`;
      numbericAmountstyle = {};
    }

    return (
      <div className="check" style={{ transform: `scale(${this.props.scale || 1})` }}>
        <div className="content">
          <div className="top-align">
            <div className="check-info">
              <div className="payer-info">
                <p className="payer-name">{this.props.payerName.toUpperCase()}</p>
                <p className="payer-addr">{this.props.payerAddressLine1.toUpperCase()}</p>
                <p className="payer-addr">{this.props.payerAddressLine2.toUpperCase()}</p>
              </div>
              <div className="date-info">
                <span className="date-label">DATE</span>
                <span className="date-string">
                  {this.props.date.getFullYear()}
                  -
                {(`0${this.props.date.getMonth() + 1}`).slice(-2)}
                  -
                {(`0${this.props.date.getDate()}`).slice(-2)}
                </span>
              </div>
            </div>
          </div>
          <div className="center-align">
            <div className="main-content">
              <div className="payee-info">
                <span className="payee-label">
                  PAY TO THE<br />
                  ORDER OF
                </span>
                <span className="payee-name">{this.props.payeeName}</span>
              </div>
              <div className="amount-numberic-info" style={numbericAmountstyle}>
                <span className="amount-dollar-symbol">$</span>
                {amount >= 0 && <span className="amount-numberic">{numberWithCommas(amount)}</span>}
              </div>
            </div>
            <div className="amount-english-info">
              <span className="amount-english">{amountEnglish.toUpperCase() || '　'}</span>
              <span className="amount-unit-word">DOLLARS</span>
            </div>
            <div className="bank-info">
              <p className="bank-name">{this.props.bankName.toUpperCase()}</p>
              <p className="bank-address">
                {this.props.bankAddress && this.props.bankAddress.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="bottom-align">
            <div className="extra-info">
              <div className="memo-info">
                <span className="memo-label">MEMO</span>
                <span className="memo">{this.props.memo}</span>
              </div>
              <div className="signature-space"></div>
            </div>
            <div className="bank-account-info">
              <span className="routing-number">a{this.props.routingNumber}a</span>
              <span className="account-number">{this.props.accountNumber}</span>
              <span className="check-number">c{this.props.checkNumber}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function numberWithCommas(x: number) {
  return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
