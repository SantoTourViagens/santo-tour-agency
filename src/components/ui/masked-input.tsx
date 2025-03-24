
import React, { useState, useEffect, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

export interface MaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  mask: string;
  onChange?: (value: string) => void;
  className?: string;
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, onChange, value, className, ...props }, ref) => {
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
      if (value !== undefined) {
        setInputValue(formatWithMask(value.toString(), mask));
      }
    }, [value, mask]);

    const formatWithMask = (value: string, mask: string): string => {
      // Clean value - remove anything that's not alphanumeric
      const cleanValue = value.replace(/[^\dA-Za-z]/g, '');
      
      let result = '';
      let cleanIndex = 0;
      
      // Apply the mask
      for (let i = 0; i < mask.length && cleanIndex < cleanValue.length; i++) {
        if (mask[i] === '9') { // Digit placeholder
          if (/\d/.test(cleanValue[cleanIndex])) {
            result += cleanValue[cleanIndex];
            cleanIndex++;
          } else {
            cleanIndex++; // Skip non-digit characters in cleanValue
            i--; // Stay at the same mask position
          }
        } else if (mask[i] === 'A') { // Alpha placeholder
          if (/[A-Za-z]/.test(cleanValue[cleanIndex])) {
            result += cleanValue[cleanIndex];
            cleanIndex++;
          } else {
            cleanIndex++; // Skip non-alpha characters in cleanValue
            i--; // Stay at the same mask position
          }
        } else if (mask[i] === '*') { // Alphanumeric placeholder
          result += cleanValue[cleanIndex];
          cleanIndex++;
        } else {
          // For mask special characters
          result += mask[i];
          // Don't increment cleanIndex as we're adding a mask character
        }
      }

      return result;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputVal = e.target.value;
      let cursorPosition = e.target.selectionStart || 0;
      
      // Handle backspace - remove the character before the cursor
      if (inputVal.length < inputValue.length && cursorPosition < inputValue.length) {
        // The user has deleted a character, possibly a mask character
        let newValue = inputValue.slice(0, cursorPosition) + inputValue.slice(cursorPosition + 1);
        
        // If we deleted a mask character, we should also delete the preceding input character
        if (mask[cursorPosition] !== '9' && mask[cursorPosition] !== 'A' && mask[cursorPosition] !== '*') {
          newValue = newValue.slice(0, cursorPosition - 1) + newValue.slice(cursorPosition);
          cursorPosition--;
        }
        
        const formattedValue = formatWithMask(newValue, mask);
        setInputValue(formattedValue);
        
        if (onChange) {
          onChange(formattedValue);
        }
        
        // We need to set the cursor position in the next tick after React updates the DOM
        setTimeout(() => {
          const input = document.getElementById(props.id || '') as HTMLInputElement;
          if (input) {
            input.setSelectionRange(cursorPosition, cursorPosition);
          }
        }, 0);
        
        return;
      }
      
      // For regular input
      const newValue = formatWithMask(inputVal, mask);
      setInputValue(newValue);
      
      if (onChange) {
        onChange(newValue);
      }
      
      // Set cursor position after all mask characters
      setTimeout(() => {
        const input = document.getElementById(props.id || '') as HTMLInputElement;
        if (input) {
          let newPosition = cursorPosition;
          // If we just added a mask character, advance the cursor
          if (newValue.length > inputValue.length) {
            newPosition += newValue.length - inputValue.length;
          }
          input.setSelectionRange(newPosition, newPosition);
        }
      }, 0);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        // Find the next focusable element
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const form = e.currentTarget.form;
        if (form) {
          const formElements = Array.from(form.querySelectorAll(focusableElements)) as HTMLElement[];
          const currentIndex = formElements.indexOf(e.currentTarget);
          const nextElement = formElements[currentIndex + 1];
          if (nextElement) {
            nextElement.focus();
          }
        }
      }
      
      if (props.onKeyDown) {
        props.onKeyDown(e);
      }
    };

    return (
      <Input
        {...props}
        ref={ref}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={cn(className)}
      />
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
