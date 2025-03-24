
import React, { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { cn } from "@/lib/utils";
import { maskDate } from "@/utils/masks";
import { parseDateString, toCalendarDate, ensureDate, DateInput, formatDateForSubmission } from "@/utils/dateUtils";

interface DatePickerInputProps {
  value: DateInput;
  onChange: (date: Date | string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  defaultMonth?: Date;
  className?: string;
  disabledDates?: (date: Date) => boolean;
  returnFormat?: "date" | "string";
}

export function DatePickerInput({
  value,
  onChange,
  placeholder = "Selecione uma data",
  disabled = false,
  defaultMonth,
  className,
  disabledDates,
  returnFormat = "date",
}: DatePickerInputProps) {
  // Format the date for display
  const initialDisplayValue = value 
    ? (value instanceof Date 
        ? format(value, "dd/MM/yyyy") 
        : typeof value === 'string' 
          ? maskDate(value.replace(/\D/g, ""))
          : "")
    : "";

  const [displayValue, setDisplayValue] = useState(initialDisplayValue);
  const [isOpen, setIsOpen] = useState(false);
  
  // Update display value when the value changes externally
  useEffect(() => {
    if (value) {
      if (value instanceof Date) {
        setDisplayValue(format(value, "dd/MM/yyyy"));
      } else if (typeof value === 'string' && value) {
        setDisplayValue(maskDate(value.replace(/\D/g, "")));
      }
    } else {
      setDisplayValue("");
    }
  }, [value]);

  // Handle manual input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const maskedValue = maskDate(input.replace(/\D/g, ""));
    setDisplayValue(maskedValue);

    // Convert to Date object if it's a complete date
    if (maskedValue.length === 10) {
      const dateObject = parseDateString(maskedValue);
      if (dateObject) {
        if (returnFormat === "string") {
          onChange(formatDateForSubmission(dateObject));
        } else {
          onChange(dateObject);
        }
      }
    } else if (maskedValue.length === 0) {
      onChange(null);
    }
  };

  // Handle calendar selection
  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      setDisplayValue(format(date, "dd/MM/yyyy"));
      if (returnFormat === "string") {
        onChange(formatDateForSubmission(date));
      } else {
        onChange(date);
      }
    } else {
      onChange(null);
    }
    setIsOpen(false);
  };

  // Safely convert to calendar date for the selected value
  const calendarDate = React.useMemo(() => {
    return ensureDate(value);
  }, [value]);

  // Safely determine default month
  const calendarDefaultMonth = React.useMemo(() => {
    if (defaultMonth) return defaultMonth;
    if (calendarDate) return calendarDate;
    return undefined;
  }, [defaultMonth, calendarDate]);

  return (
    <div className={cn("relative flex items-center", className)}>
      <Input 
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        className="pr-10"
      />
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 h-full px-3 text-muted-foreground"
            onClick={() => setIsOpen(true)}
            disabled={disabled}
            type="button"
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={calendarDate || undefined}
            onSelect={handleCalendarSelect}
            disabled={disabledDates}
            defaultMonth={calendarDefaultMonth}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
