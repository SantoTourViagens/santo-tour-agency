
import * as React from "react"
import { cn } from "@/lib/utils"
import { formatCurrency, parseCurrency } from "@/utils/masks"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isCurrency?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isCurrency, onKeyDown, onChange, ...props }, ref) => {
    // State to track the raw numeric value for currency inputs
    const [rawValue, setRawValue] = React.useState<number | undefined>(
      isCurrency && props.value !== undefined ? 
        typeof props.value === 'number' ? 
          props.value : 
          parseCurrency(String(props.value)) 
        : undefined
    );

    // Handle currency input 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isCurrency) {
        // For currency inputs, handle the masking and parsing
        const inputValue = e.target.value;
        const unmaskedValue = inputValue.replace(/[^\d,]/g, '').replace(',', '.');
        const numericValue = unmaskedValue ? parseFloat(unmaskedValue) : 0;
        
        // Update the internal raw value
        setRawValue(numericValue);
        
        // Create a new synthetic event with the numeric value
        if (onChange) {
          const newEvent = {
            ...e,
            target: {
              ...e.target,
              value: numericValue.toString()
            }
          } as React.ChangeEvent<HTMLInputElement>;
          
          onChange(newEvent);
        }
      } else if (onChange) {
        // For non-currency inputs, just pass through
        onChange(e);
      }
    };

    // Handle Enter key to move to next field
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        // Find the next focusable element
        const focusableElements = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])';
        const form = e.currentTarget.form;
        if (form) {
          const formElements = Array.from(form.querySelectorAll(focusableElements)) as HTMLElement[];
          const currentIndex = formElements.indexOf(e.currentTarget);
          if (currentIndex > -1 && currentIndex < formElements.length - 1) {
            const nextElement = formElements[currentIndex + 1];
            nextElement.focus();
          }
        }
      }
      
      // Call the original onKeyDown handler if provided
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    // Update the raw value when props.value changes externally
    React.useEffect(() => {
      if (isCurrency && props.value !== undefined) {
        const newValue = typeof props.value === 'number' ? 
          props.value : 
          parseCurrency(String(props.value));
          
        if (newValue !== rawValue) {
          setRawValue(newValue);
        }
      }
    }, [isCurrency, props.value, rawValue]);

    // Format the display value for currency inputs
    const displayValue = React.useMemo(() => {
      if (isCurrency) {
        return formatCurrency(rawValue);
      }
      return props.value;
    }, [isCurrency, props.value, rawValue]);

    return (
      <input
        type={isCurrency ? "text" : type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:text-input-foreground",
          className
        )}
        ref={ref}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={displayValue}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
