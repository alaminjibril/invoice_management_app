export const validateInvoiceForm = (values) => {
  const errors = {};

  const requiredFields = {
    clientName: "can't be empty",
    clientEmail: "can't be empty",
    description: "can't be empty"
  };

  Object.entries(requiredFields).forEach(([field, msg]) => {
    if (!values[field] || !values[field].trim()) {
      errors[field] = msg;
    }
  });

  if (values.clientEmail && values.clientEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.clientEmail)) {
    errors.clientEmail = 'invalid email';
  }

  const validateAddress = (addressType) => {
    const fields = ['street', 'city', 'postCode', 'country'];
    fields.forEach(field => {
      const val = values[addressType]?.[field];
      if (!val || !val.trim()) {
        errors[`${addressType}.${field}`] = "can't be empty";
      }
    });
  };

  validateAddress('senderAddress');
  validateAddress('clientAddress');

  if (!values.issueDate) errors.issueDate = "can't be empty";
  if (values.paymentTerms === undefined || values.paymentTerms === null) errors.paymentTerms = "can't be empty";

  if (!values.items || values.items.length === 0) {
    errors.items = '- An item must be added';
  } else {
    // We can store item-specific errors in an array of objects
    const itemErrors = [];
    let hasItemErrors = false;

    values.items.forEach((item, index) => {
      const itemError = {};
      
      if (!item.name || !item.name.trim()) itemError.name = 'Name missing';
      if (item.quantity === undefined || item.quantity <= 0) itemError.quantity = 'Invalid qty';
      if (item.price === undefined || item.price < 0) itemError.price = 'Invalid price';

      if (Object.keys(itemError).length > 0) {
        hasItemErrors = true;
      }
      itemErrors[index] = itemError;
    });

    if (hasItemErrors) {
      errors.itemsList = itemErrors;
    }
  }

  return errors;
};
