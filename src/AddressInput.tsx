import React, { useCallback } from 'react';
import { AddressInfo } from './CheckCanvas';

interface Props {
  name: string,
  className?: string;
  value: AddressInfo;
  onChange: (_: AddressInfo) => void;
}

export default function AddressInput({
  name,
  className,
  value,
  onChange: onChangeFromProps,
}: Props) {
  const onChange = useCallback(
    (
      formKey: (keyof AddressInfo),
      event: React.ChangeEvent<HTMLInputElement>,
    ) => onChangeFromProps({
      ...value,
      [formKey]: event.target.value,
    }),
    [onChangeFromProps, value],
  );
  return (
    <div className={className}>
      <label className="form-label">{name}</label>
      <input
        type="text"
        className="form-control"
        placeholder="Name"
        required
        value={value.name}
        onChange={e => onChange('name', e)}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Address line 1 (optional)"
        value={value.line1}
        onChange={e => onChange('line1', e)}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Address line 2 (optional)"
        value={value.line2}
        onChange={e => onChange('line2', e)}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Address line 3 (optional)"
        value={value.line3}
        onChange={e => onChange('line3', e)}
      />
    </div>
  );
}
