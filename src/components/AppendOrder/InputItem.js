import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormRow = styled.div`
  font-size: 1.2rem;
  display: flex;
  line-height: 1.6rem;
  margin-bottom: 0.5rem;

  & input {
    height: 1.5rem;
    padding: 0 0.5rem;
    display: block;
    border: 1px solid black;

    &:focus {
      outline: 0;
    }
  }

  & select {
    height: 1.6rem;
    padding: 0 1rem;
    font-size: 1rem;
  }
`;

const Alert = styled.div`
  color: #e74149;
  font-size: 1rem;
  margin-left: 0.5rem;
`;

const InputItem = ({
  type,
  name,
  value,
  question,
  placeholder,
  required,
  hasError,
  errorMessage,
  handleInputChange,
}) => {
  return (
    <FormRow>
      <label htmlFor={name}>{question}</label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={handleInputChange}
        placeholder={placeholder}
        required
      />
      {hasError && !value && <Alert>{errorMessage}</Alert>}
    </FormRow>
  );
};

InputItem.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  question: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleInputChange: PropTypes.func,
};

const SelectInput = ({
  name,
  value,
  question,
  option,
  required,
  hasError,
  errorMessage,
  handleInputChange,
}) => {
  return (
    <FormRow>
      <label htmlFor={name}>
        {question}
        <select
          name={name}
          defaultValue='Select'
          onChange={handleInputChange}
          required
        >
          <option value='Select' disabled>
            Select
          </option>
          {option.map((item, index) => {
            return (
              <option value={item} key={index} checked={value === item}>
                {item}
              </option>
            );
          })}
        </select>
      </label>
      {hasError && !value && <Alert>{errorMessage}</Alert>}
    </FormRow>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  question: PropTypes.string,
  option: PropTypes.array,
  required: PropTypes.bool,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleInputChange: PropTypes.func,
};

export { InputItem, SelectInput };
