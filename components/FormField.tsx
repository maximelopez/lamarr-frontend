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
      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldId} className="font-body text-sm font-medium text-ink">
          {label}
        </label>
        <input
          ref={ref}
          id={fieldId}
          name={name}
          className={`rounded-xl border bg-paper px-3 py-2.5 font-body text-sm text-ink outline-none transition focus:ring-2 focus:ring-base/15 ${
            error ? "border-entreprenariat-500" : "border-border focus:border-base"
          }`}
          {...props}
        />
        {error && <p className="font-body text-xs text-entreprenariat-700">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";
export default FormField;