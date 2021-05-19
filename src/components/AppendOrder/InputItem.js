import styled from 'styled-components';
// import PropTypes from 'prop-types';

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
  margin-top: 1vmin;
  margin-left: 2vmin;
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
      />
      {required && hasError && !value && <Alert>{errorMessage}</Alert>}
    </FormRow>
  );
};

// InputItem.propTypes = {
//   type: PropTypes.string,
//   name: PropTypes.string,
//   value: PropTypes.string,
//   question: PropTypes.string,
//   placeholder: PropTypes.string,
//   required: PropTypes.bool,
//   hasError: PropTypes.bool,
//   errorMessage: PropTypes.string,
//   handleInputChange: PropTypes.func,
// };

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

        <select name={name} value={value} onChange={handleInputChange} required>
          <option value='' disabled selected>
            Select
          </option>
          {option.map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
      </label>
      {required && hasError && !value && <Alert>{errorMessage}</Alert>}
    </FormRow>
  );
};

// SelectItem.propTypes = {
//   name: PropTypes.string,
//   value: PropTypes.string,
//   question: PropTypes.string,
//   required: PropTypes.bool,
//   hasError: PropTypes.bool,
//   errorMessage: PropTypes.string,
//   handleInputChange: PropTypes.func,
// };

export { InputItem, SelectInput };
