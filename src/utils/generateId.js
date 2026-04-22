export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function generateInvoiceNumber(invoices = []) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetter = () => letters.charAt(Math.floor(Math.random() * letters.length));
  const randomDigit = () => Math.floor(Math.random() * 10).toString();
  
  let newId;
  let isUnique = false;
  
  while (!isUnique) {
    newId = `${randomLetter()}${randomLetter()}${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}`;
    isUnique = !invoices.some(inv => inv.invoiceNumber === newId);
  }
  
  return newId;
}
