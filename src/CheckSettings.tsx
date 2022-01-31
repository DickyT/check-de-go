import React, {
  useCallback, useEffect,
} from 'react';

import { AddressInfo, CheckInfo } from './CheckCanvas';
import AddressInput from './AddressInput';
import './CheckSettings.css';

interface Props {
  value: CheckInfo;
  onChange: React.Dispatch<React.SetStateAction<CheckInfo>>,
}

export default function CheckSettings({
  value: formData,
  onChange: setFormData,
}: Props) {
  const onChange = useCallback(
    (
      formKey: (keyof CheckInfo),
      event: React.ChangeEvent<HTMLInputElement>,
    ) => setFormData(oldFormData => ({
      ...oldFormData,
      [formKey]: event.target.value,
    })),
    [setFormData],
  );
  const onAddressChange = useCallback((
    formKey: (keyof CheckInfo),
    value: AddressInfo,
  ) => setFormData(oldFormData => ({
    ...oldFormData,
    [formKey]: value,
  })), [setFormData]);

  useEffect(() => {
    if (formData.routingNumber.length === 9) {
      (async () => {
        try {
          const req = await fetch(`https://www.routingnumbers.info/api/data.json?rn=${formData.routingNumber}`);
          const data = await req.json();
          if (data.message === 'OK') {
            setFormData(oldFormData => ({
              ...oldFormData,
              bankAddress: {
                name: data.customer_name,
                line1: data.address,
                line2: `${data.city}, ${data.state} ${data.zip}`,
                line3: '',
              },
            }));
          } else {
            throw new Error('Routing number service not available');
          }
          // eslint-disable-next-line no-empty
        } catch (e) {
          setFormData(oldFormData => ({
            ...oldFormData,
            bankAddress: {
              name: '',
              line1: '',
              line2: '',
            },
          }));
        }
      })();
    }
  }, [formData.routingNumber, setFormData]);

  return (
    <div className="check-settings">
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
              value={formData.amount}
              onChange={e => onChange('amount', e)}
              required
            />
          </div>
        </div>
        <div className="col-3">
          <label htmlFor="routing-num" className="form-label">Routing Number</label>
          <input
            type="text"
            className="form-control"
            id="routing-num"
            placeholder="Routing Number"
            value={formData.routingNumber}
            onChange={e => onChange('routingNumber', e)}
            required
          />
        </div>
        <div className="col-3">
          <label htmlFor="account-num" className="form-label">Account Number</label>
          <input
            type="text"
            className="form-control"
            id="account-num"
            placeholder="Account Number"
            value={formData.accountNumber}
            onChange={e => onChange('accountNumber', e)}
            required
          />
        </div>
        <div className="col-3">
          <label htmlFor="check-num" className="form-label">Check Number</label>
          <input
            type="text"
            className="form-control"
            id="check-num"
            placeholder="Check Number"
            value={formData.checkNumber}
            onChange={e => onChange('checkNumber', e)}
            required
          />
        </div>
        <div className="col-3">
          <label htmlFor="issue-date" className="form-label">Issue Date</label>
          <input
            type="text"
            className="form-control"
            id="issue-date"
            placeholder="05/35/1989"
            value={formData.issueDate}
            onChange={e => onChange('issueDate', e)}
            required
          />
        </div>
        <div className="col-2">
          <label htmlFor="void-after" className="form-label">Void after Days</label>
          <input
            type="number"
            className="form-control"
            id="void-after"
            value={formData.expireDays}
            onChange={e => onChange('expireDays', e)}
            required
          />
        </div>
        <div className="col-7">
          <label htmlFor="check-memo" className="form-label">Memo</label>
          <input
            type="text"
            className="form-control"
            id="check-memo"
            placeholder="Check Memo"
            value={formData.memo}
            onChange={e => onChange('memo', e)}
          />
        </div>
        <AddressInput
          className="col-4 address-info"
          name="Sender Info"
          value={formData.senderAddress}
          onChange={(val) => onAddressChange('senderAddress', val)}
        />
        <AddressInput
          className="col-4 address-info"
          name="Receiver Info"
          value={formData.receiverAddress}
          onChange={(val) => onAddressChange('receiverAddress', val)}
        />
        <AddressInput
          className="col-4 address-info"
          name="Bank Info"
          value={formData.bankAddress}
          onChange={(val) => onAddressChange('bankAddress', val)}
        />
        <div className="col-12">
          <label htmlFor="check-bg" className="form-label">
            Background Image
            {' '}
            <small><strong>(IMGUR URL ONLY)</strong></small>
          </label>
          <input
            type="text"
            className="form-control"
            id="check-bg"
            placeholder="Background Image URL"
            value={formData.bg}
            onChange={e => onChange('bg', e)}
          />
        </div>
        <div className="col-12">
          <label htmlFor="check-logo" className="form-label">
            Logo Image
            {' '}
            <small><strong>(IMGUR URL ONLY)</strong></small>
          </label>
          <input
            type="text"
            className="form-control"
            id="check-logo"
            placeholder="Logo Image URL"
            value={formData.logo}
            onChange={e => onChange('logo', e)}
          />
        </div>
      </div>
    </div>
  );
}
