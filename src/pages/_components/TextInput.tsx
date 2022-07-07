import React from 'react';

export type TextInputProps = {
  error?: string;
  name: string;
  label: string;
  defaultValue?: string;
  type?: 'text' | 'email';
} & React.HTMLProps<HTMLInputElement>;

export const TextInput = ({ name, error, label, defaultValue, type = 'text', ...props }: TextInputProps) => {
  return (
    <div className={`fr-input-group ${!!error && 'fr-input-group--error'}`}>
      <label className='fr-label' htmlFor={name}>
        {label}
      </label>
      <input
        {...props}
        aria-describedby=''
        type={type}
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
