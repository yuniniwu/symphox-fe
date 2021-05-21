import { useCallback, useEffect, useState } from 'react';
import { postOrders } from '../WebAPI';

const useForm = () => {
  // let initial value execute only once
  const [inputValue, setInputValue] = useState(() => {
    return [
      {
        product_name: '',
        logo_url: '',
        order_status: '',
      },
    ];
  });

  const [hasError, setHasError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { product_name, logo_url, order_status } = inputValue;

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setInputValue([
      ...inputValue,
      {
        [name]: value,
      },
    ]);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log('submit event');
      // console.log(inputValue);
      // console.log(hasError);

      if (!product_name || !logo_url || !order_status) {
        return setHasError(true);
      }
      console.log('submit event2');
      setHasError(false);
      // sending post request, TODO:useEffect?

      // postOrders(inputValue);

      // TODO:clear input value
    },
    [product_name, logo_url, order_status]
  );

  const handleFocus = useCallback(() => {
    setHasError(false);
    setIsDisabled(false);
  }, []);

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
