import React from 'react';

import './BackSideSettings.css';

export default function BackSideSettings() {
  return (
    <div className="check-settings">
      <h6>Back Side Settings</h6>
      <div className="row g-3">
        <div className="col-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="text"
              className="form-control"
              id="amount"
              placeholder="Check Amount"
              // value={formData.amount}
              // onChange={e => onChange('amount', e)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
