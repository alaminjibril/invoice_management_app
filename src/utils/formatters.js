export function formatCurrency(amount) {
  if (amount === undefined || amount === null) return '£ 0.00';
  const formatted = new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `£ ${formatted}`;
}

export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  // Ensure invalid dates don't throw
  if (isNaN(date.getTime())) return dateString;
  
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
