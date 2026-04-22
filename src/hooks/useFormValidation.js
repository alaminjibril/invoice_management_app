import { useState } from 'react';
import { validateInvoiceForm } from '../utils/validators';

export function useFormValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setValues((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Validate single field
    const newErrors = validateInvoiceForm(values);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const validateAll = () => {
    const newErrors = validateInvoiceForm(values);
    setErrors(newErrors);
    
    // Mark all as touched, including nested structures
    const allTouched = {};
    const markTouched = (obj, prefix = '') => {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          markTouched(obj[key], `${prefix}${key}.`);
        } else {
          allTouched[`${prefix}${key}`] = true;
        }
      });
    };
    markTouched(values);
    setTouched((prev) => ({ ...prev, ...allTouched }));
    
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    setValues,
    errors,
    setErrors, // sometimes need manual error setting
    touched,
    handleChange,
    handleBlur,
    validateAll
  };
}
