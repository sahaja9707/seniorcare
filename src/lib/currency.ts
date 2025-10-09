// Currency conversion utilities
// This is typically used for one-time data migration/conversion tasks

export function convertCurrency(
  value: string | number,
  conversionRate: number = 88
): string {
  let amount: number;

  if (typeof value === 'string') {
    // Remove currency symbols and commas, extract numeric part
    const numericStr = value
      .replace(/[$₹,]/g, '')
      .trim();
    
    amount = parseFloat(numericStr);
    
    if (isNaN(amount)) {
      throw new Error(`Cannot parse value: ${value}`);
    }
  } else {
    amount = value;
  }

  const converted = amount * conversionRate;
  return `₹${converted.toFixed(2)}`;
}

export function parseCurrencyValue(value: string): number {
  const numericStr = value
    .replace(/[$₹,]/g, '')
    .trim();
  
  const amount = parseFloat(numericStr);
  
  if (isNaN(amount)) {
    throw new Error(`Cannot parse currency value: ${value}`);
  }
  
  return amount;
}

export function formatIndianCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
