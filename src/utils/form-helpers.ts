
import { formatDateForDB } from "./dateUtils";

// Helper for processing form data for submission
export const processFormData = <T extends Record<string, any>>(data: T, additionalFields?: Record<string, any>): Record<string, any> => {
  const processedData: Record<string, any> = {};
  
  // Process all fields from the original data
  for (const [key, value] of Object.entries(data)) {
    // Handle date objects by converting them to DB format
    if (value instanceof Date) {
      processedData[key] = formatDateForDB(value);
    } else {
      processedData[key] = value === "" ? null : value;
    }
  }
  
  // Add any additional fields
  if (additionalFields) {
    Object.assign(processedData, additionalFields);
  }
  
  return processedData;
};

// Type-safe function to rename keys in a schema
export function renameFields<T extends Record<string, any>>(
  obj: T, 
  fieldMap: Record<string, keyof T>
): Partial<T> {
  const result: Partial<T> = {};
  
  for (const [oldKey, newKey] of Object.entries(fieldMap)) {
    if (oldKey in obj) {
      result[newKey] = obj[oldKey as keyof T];
    }
  }
  
  return result;
}
