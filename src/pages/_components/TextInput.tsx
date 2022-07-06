import React from 'react';

export type TextInputProps = {
  error?: string;
  name: string;
  label: string;
  defaultValue?: string;
};

export const TextInput = ({ name, error, label, defaultValue }: TextInputProps) => {
  return (
    <div className={`fr-input-group ${!!error && 'fr-input-group--error'}`}>
      <label className='fr-label' htmlFor={name}>
        {label}
      </label>
      <input
        aria-describedby=''
        type='text'
        className={`fr-input ${!!error && 'fr-input--error'}`}
        id={name}
        name={name}
        required
        defaultValue={defaultValue}
      />
      {!!error && <p className='fr-error-text'>{error}</p>}
    </div>
  );
};
