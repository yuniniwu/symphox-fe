import { useState } from 'react';

const useForm = () => {
  const [inputValue, setInputValue] = useState({
    product_name: '',
    logo_url: '',
    order_status: '',
  });

  const [hasError, setHasError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { product_name, logo_url, order_status } = inputValue;

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product_name || !logo_url || !order_status) {
      return setHasError(true);
    }
    setHasError(false);
    // send API to DB
    alert(JSON.stringify(inputValue));
  };

  const handleFocus = () => {
    setHasError(false);
    setIsDisabled(false);
  };

  return {
    product_name,
    logo_url,
    order_status,
    hasError,
    isDisabled,
    handleInputChange,
    handleSubmit,
    handleFocus,
  };
};

export default useForm;
