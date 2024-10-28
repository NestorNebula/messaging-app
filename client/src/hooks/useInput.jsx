import { useState } from 'react';

const useInput = (validateInput) => {
  const [value, setValue] = useState('');
  const [validation, setValidation] = useState({ isValid: true });

  const updateValue = (e) => {
    setValue(e.target.value);
    checkValue(e.target.value);
  };

  const checkValue = (v) => {
    const message = validateInput(v);
    setValidation(message ? { isValid: false, message } : { isValid: true });
  };

  return { value, validation, updateValue };
};

export { useInput };
