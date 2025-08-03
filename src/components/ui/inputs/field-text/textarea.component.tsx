import React, { ChangeEvent, useEffect, useRef } from 'react';
import { FieldError } from 'react-hook-form';
import { FieldTextContainer } from './field-text.style';

type TextareaProps = {
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  register?: any;
  className?: string;
  min?: number;
  max?: number;
  rows?: number;
  disabled?: boolean;
  onKeyDown?: any;
  error?: FieldError;
};

export const Textarea = ({
  label,
  placeholder = '',
  required,
  onChange,
  value,
  register,
  className,
  max,
  min,
  disabled,
  rows = 3,
  error,
  ...props
}: TextareaProps) => {
  const textAreaRef = useRef<any>(null);
  const maxHeight = 85;

  useEffect(() => {
    if (textAreaRef?.current) {
      textAreaRef.current.style.height = 'auto';
      const scrollHeight =
        textAreaRef.current.scrollHeight > maxHeight
          ? maxHeight
          : textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, value]);

  return (
    <FieldTextContainer className={className} hasError={!!error}>
      {label && (
        <label htmlFor="">
          {label} {required && <span>*</span>}
        </label>
      )}

      <div className="input-container textarea">
        <textarea
          {...props}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          disabled={disabled}
          ref={textAreaRef}
          rows={rows}
          className="form-control"
          {...register}
        />
        {error && <span className="error-container">{error?.message}</span>}
      </div>
    </FieldTextContainer>
  );
};
