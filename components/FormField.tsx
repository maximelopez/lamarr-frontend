import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, name, ...props }, ref) => {
    const fieldId = id ?? name;
    return (
      <div className="field">
        <label className="field__label" htmlFor={fieldId}>
          {label}
        </label>
        <input
          ref={ref}
          id={fieldId}
          name={name}
          className={`field__input${error ? " field__input--error" : ""}`}
          {...props}
        />
        {error && <p className="field__error">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";
export default FormField;