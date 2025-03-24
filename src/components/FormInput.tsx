
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = ({ 
  label, 
  className, 
  error, 
  required, 
  type = "text", 
  ...props 
}: FormInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);
  
  return (
    <div className="mb-5 last:mb-0">
      <div className="relative">
        <input
          type={type}
          className={cn(
            "peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-foreground placeholder-transparent focus:border-primary focus:outline-none focus:ring-0",
            hasValue || isFocused ? "border-primary" : "",
            error ? "border-red-500" : "",
            className
          )}
          placeholder={label}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            if (props.onChange) props.onChange(e);
          }}
          required={required}
          {...props}
        />
        <label
          className={cn(
            "absolute left-0 top-3 origin-left transform text-gray-500 duration-200 ease-out",
            hasValue || isFocused 
              ? "-translate-y-6 scale-75 text-primary" 
              : "",
            error 
              ? "text-red-500" 
              : "",
            isFocused 
              ? "text-primary" 
              : ""
          )}
        >
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-red-500 animate-fade-in">{error}</p>}
    </div>
  );
};

export default FormInput;
