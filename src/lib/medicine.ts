/**
 * Medicine management functions
 * Server-side operations for medicines
 */

import { Medicine } from './dataStructures/MedicineQueue';

/**
 * Validate medicine data
 */
export function validateMedicine(medicine: Partial<Medicine>): {
  valid: boolean;
  error?: string;
} {
  if (!medicine.name || medicine.name.trim().length === 0) {
    return { valid: false, error: 'Medicine name is required' };
  }

  if (!medicine.dosage || medicine.dosage.trim().length === 0) {
    return { valid: false, error: 'Dosage is required' };
  }

  if (!medicine.frequency || medicine.frequency.trim().length === 0) {
    return { valid: false, error: 'Frequency is required' };
  }

  if (!medicine.times || medicine.times.length === 0) {
    return { valid: false, error: 'At least one reminder time is required' };
  }

  // Validate time format
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  for (const time of medicine.times) {
    if (!timeRegex.test(time)) {
      return { valid: false, error: `Invalid time format: ${time}. Use HH:MM format (e.g., 09:00, 14:30)` };
    }
  }

  return { valid: true };
}

/**
 * Create medicine object
 */
export function createMedicine(
  name: string,
  dosage: string,
  frequency: string,
  times: string[],
  expiryDate?: string
): Medicine {
  return {
    name: name.trim(),
    dosage: dosage.trim(),
    frequency: frequency.trim(),
    times: times.map(t => t.trim()),
    expiryDate: expiryDate?.trim(),
  };
}

/**
 * Format medicine for display
 */
export function formatMedicine(medicine: Medicine): string {
  const times = medicine.times.join(', ');
  return `${medicine.name} - ${medicine.dosage} - ${medicine.frequency} - Times: ${times}`;
}
