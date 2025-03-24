
import { parse, format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

// Types
export type DateValue = Date | string | null | undefined;
export type DateInput = string | number | Date | null | undefined;

// Convert a string date in DD/MM/YYYY format to a Date object
export const parseDateString = (dateString: string): Date | null => {
  // Handle empty strings
  if (!dateString) return null;
  
  // If already in DD/MM/YYYY format
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    const parsed = parse(dateString, "dd/MM/yyyy", new Date());
    return isValid(parsed) ? parsed : null;
  }
  
  // If in YYYY-MM-DD format (database format)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const parsed = parse(dateString, "yyyy-MM-dd", new Date());
    return isValid(parsed) ? parsed : null;
  }
  
  return null;
};

// Safely convert various date formats to strings for display (DD/MM/YYYY)
export const toDisplayDate = (date: DateInput): string => {
  if (!date) return "";
  
  if (date instanceof Date) {
    return isValid(date) ? format(date, "dd/MM/yyyy") : "";
  }
  
  if (typeof date === 'string') {
    const parsed = parseDateString(date);
    if (parsed) {
      return format(parsed, "dd/MM/yyyy");
    }
    return date;
  }
  
  return String(date);
};

// Safely convert various date formats to strings for database (YYYY-MM-DD)
export const toDBDate = (date: DateInput): string => {
  if (!date) return "";
  
  if (date instanceof Date) {
    return isValid(date) ? format(date, "yyyy-MM-dd") : "";
  }
  
  if (typeof date === 'string') {
    const parsed = parseDateString(date);
    if (parsed) {
      return format(parsed, "yyyy-MM-dd");
    }
    return date;
  }
  
  return String(date);
};

// Format a date in a Brazilian locale-friendly way
export const formatBrazilianDate = (date: DateInput): string => {
  if (!date) return "";
  
  let dateObj: Date | null = null;
  
  if (typeof date === 'string') {
    dateObj = parseDateString(date);
    if (!dateObj) return date; // Return original if parsing fails
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    return "";
  }
  
  return format(dateObj, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

// Compare dates safely regardless of their original format
export const compareDates = (date1: DateInput, date2: DateInput): number => {
  // Helper to convert any date input to timestamp
  const toTimestamp = (d: DateInput): number => {
    if (!d) return 0;
    if (d instanceof Date) return d.getTime();
    if (typeof d === 'string') {
      const parsed = parseDateString(d);
      return parsed ? parsed.getTime() : 0;
    }
    if (typeof d === 'number') {
      const date = new Date(d);
      return isValid(date) ? date.getTime() : 0;
    }
    return 0;
  };
  
  return toTimestamp(date1) - toTimestamp(date2);
};

// Transform a Date object or string to a valid Date for the Calendar component
export const toCalendarDate = (date: DateInput): Date | undefined => {
  if (!date) return undefined;
  
  if (date instanceof Date) {
    return isValid(date) ? date : undefined;
  }
  
  if (typeof date === 'string') {
    const parsed = parseDateString(date);
    return parsed || undefined;
  }
  
  return undefined;
};

// Safe date conversion for Zod schemas
export const safeFormatDate = (date: Date | null | undefined): string => {
  if (!date) return "";
  return isValid(date) ? format(date, "yyyy-MM-dd") : "";
};

// These are the aliases for compatibility with code that uses formatDateForDB and formatDateForDisplay
export { toDBDate as formatDateForDB, toDisplayDate as formatDateForDisplay };

// Helper for creating a date from unknown input
export const safeParseDateInput = (value: unknown): Date | null => {
  if (!value) return null;
  
  if (value instanceof Date) {
    return isValid(value) ? value : null;
  }
  
  if (typeof value === 'string') {
    return parseDateString(value);
  }
  
  if (typeof value === 'number') {
    const date = new Date(value);
    return isValid(date) ? date : null;
  }
  
  return null;
};

// Helper for safely converting a value to a Date for Calendar component
export const safeToMatcher = (value: unknown): Date | undefined => {
  const date = safeParseDateInput(value);
  return date || undefined;
};

// Helper to create a Date object from form values
export const createDateFromValue = (value: unknown): Date | null => {
  // Handle Date objects
  if (value instanceof Date) {
    return isValid(value) ? value : null;
  }
  
  // Handle strings (parse them)
  if (typeof value === 'string') {
    return parseDateString(value);
  }
  
  // Handle everything else (return null)
  return null;
};

// Helper to compare a Date with a string date
export const isDateBeforeString = (date: Date, dateString: string): boolean => {
  const parsedDate = parseDateString(dateString);
  if (!parsedDate) return false;
  
  return date.getTime() < parsedDate.getTime();
};

// Convert any date input to a Date object or return null
export const ensureDate = (value: unknown): Date | null => {
  if (!value) return null;
  
  if (value instanceof Date) {
    return isValid(value) ? value : null;
  }
  
  if (typeof value === 'string') {
    const parsed = parseDateString(value);
    return parsed;
  }
  
  if (typeof value === 'number') {
    const date = new Date(value);
    return isValid(date) ? date : null;
  }
  
  return null;
};

// Type guard to check if a value is a valid Date object
export const isValidDate = (value: unknown): value is Date => {
  return value instanceof Date && isValid(value);
};

// Convert a Date to a string format for form submissions
export const formatDateForSubmission = (date: DateInput): string => {
  if (!date) return "";
  
  if (date instanceof Date) {
    return isValid(date) ? format(date, "yyyy-MM-dd") : "";
  }
  
  if (typeof date === 'string') {
    // If it's already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    
    const parsed = parseDateString(date);
    return parsed ? format(parsed, "yyyy-MM-dd") : "";
  }
  
  return "";
};
