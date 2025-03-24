
import * as React from "react";
import { Input } from "./input";

interface NumericInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value: number | undefined;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  integer?: boolean;
  decimals?: number;
}

export const NumericInput = React.forwardRef<HTMLInputElement, NumericInputProps>(
  ({ value, onChange, min, max, integer = false, decimals = 2, ...props }, ref) => {
    // Format the input value to enforce constraints
    const formatValue = (inputValue: string): number => {
      // Remove non-numeric characters except decimal point
      let processedValue = inputValue.replace(/[^\d.-]/g, '');
      
      // Ensure only one decimal point
      const decimalCount = (processedValue.match(/\./g) || []).length;
      if (decimalCount > 1) {
        const firstDecimalIndex = processedValue.indexOf('.');
        processedValue = processedValue.substring(0, firstDecimalIndex + 1) + 
                         processedValue.substring(firstDecimalIndex + 1).replace(/\./g, '');
      }
      
      // Parse to number
      let numericValue = processedValue ? parseFloat(processedValue) : 0;
      
      // Apply integer constraint
      if (integer) {
        numericValue = Math.floor(numericValue);
      }
      
      // Apply min/max constraints
      if (min !== undefined && numericValue < min) {
        numericValue = min;
      }
      if (max !== undefined && numericValue > max) {
        numericValue = max;
      }
      
      return numericValue;
    };

    // Handle change events
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = formatValue(e.target.value);
      onChange(newValue);
    };

    // Format displayed value
    const displayValue = value !== undefined ? 
      (integer ? 
        String(value) : 
        value.toFixed(decimals)) : 
      '';

    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        inputMode={integer ? "numeric" : "decimal"}
        value={displayValue}
        onChange={handleChange}
      />
    );
  }
);

NumericInput.displayName = "NumericInput";
