import { useState } from 'react';
import { postOrders } from '../WebAPI';
import { getOrderCode } from '../utils';

const useForm = () => {
  const defaultField = {
    name: '',
    logo: '',
    status: {
      code: 0,
      type: 'Select',
    },
  };

  const [fields, setFields] = useState([defaultField]);

  const [hasError, setHasError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const addChild = () => {
    setFields([...fields, defaultField]);
  };

  const handleInputChange = (id, e) => {
    const value = e.target.value;
    const name = e.target.name;
    const newOrder = fields.map((item, index) => {
      if (id === index) {
        if (name === 'status') {
          item.status.type = value;
          item.status.code = getOrderCode(value);
        } else {
          item[name] = value;
        }
      }
      return item;
    });

    setFields(newOrder);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postOrders(fields);
    setFields([defaultField]);
  };

  const handleFocus = () => {
    setHasError(false);
    setIsDisabled(false);
  };

  return {
    fields,
    hasError,
    isDisabled,
    addChild,
    handleInputChange,
    handleSubmit,
    handleFocus,
  };
};

export default useForm;
