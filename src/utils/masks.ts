// src\utils\masks.ts
// Import the date utilities we need
import { parseDateString, toDBDate, toDisplayDate } from "./dateUtils";

// Format CPF: 000.000.000-00
export const maskCPF = (value: string): string => {
  if (!value) return "";
  
  // Remove non-numeric characters
  const numericValue = value.replace(/\D/g, "");
  
  // Limit to 11 digits
  const limitedValue = numericValue.slice(0, 11);
  
  // Apply the mask
  return limitedValue
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

// Format phone: (00) 0000-0000 or (00) 00000-0000
export const maskPhone = (value: string): string => {
  if (!value) return "";
  
  // Remove non-numeric characters
  const numericValue = value.replace(/\D/g, "");
  
  // Limit to 11 digits
  const limitedValue = numericValue.slice(0, 11);
  
  // Check if it's a cellphone (11 digits) or landline (10 digits)
  if (limitedValue.length > 10) {
    return limitedValue
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  } else {
    return limitedValue
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
};

// Format date: DD/MM/YYYY
export const maskDate = (value: string): string => {
  if (!value) return "";
  
  // Remove non-numeric characters
  const numericValue = value.replace(/\D/g, "");
  
  // Limit to 8 digits (DDMMYYYY)
  const limitedValue = numericValue.slice(0, 8);
  
  // Apply the mask
  return limitedValue
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
};

// Format currency: R$ 0,00
export const formatCurrency = (value: number | undefined): string => {
  if (value === undefined || isNaN(value)) return "R$ 0,00";
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Parse currency string to number
export const parseCurrency = (value: string): number => {
  if (!value) return 0;
  
  // Remove currency symbol, thousand separators, replace comma with dot
  const numericValue = value
    .replace(/R\$\s?/g, '')
    .replace(/\./g, '')
    .replace(/,/g, '.');
  
  return parseFloat(numericValue) || 0;
};

// Remove any mask and return only numbers
export const unmask = (value: string | number | Date | undefined | null): string => {
  if (value === undefined || value === null) return "";
  
  // Convert to string first to handle all possible types
  const stringValue = String(value);
  return stringValue.replace(/\D/g, "");
};

// Export aliases using the imported functions
export { toDBDate as formatDateForDB, toDisplayDate as formatDateForDisplay };
