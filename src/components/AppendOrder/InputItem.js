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
  handleFocus,
  groupId,
}) => {
  return (
    <FormRow>
      <label htmlFor={name}>{question}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => handleInputChange(groupId, e)}
        onFocus={handleFocus}
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
  groupID: PropTypes.number,
};

const SelectInput = ({
  name,
  value,
  question,
  options,
  required,
  hasError,
  errorMessage,
  handleInputChange,
  handleFocus,
  groupId,
}) => {
  return (
    <FormRow>
      <label htmlFor={name}>
        {question}
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => handleInputChange(groupId, e)}
          onFocus={handleFocus}
          required
        >
          <option value='Select' disabled>
            Select
          </option>
          {options.map((item, index) => {
            return (
              <option value={item} key={index}>
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
  groupId: PropTypes.number,
};

const SubmitInput = styled.input`
  margin: 0.5rem;
  align-self: flex-end;
  flex: 0;
  border: none;
  box-sizing: border-box;
  box-shadow: 2px 2px 10px #555;
  padding: 0.4rem 1.6rem;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #ddd;
  }
  ${(props) =>
    props.disabled === true &&
    `
    background: #ccc;
    color: #fff;
    cursor: none;
    transition: none;
  `}
`;

export { InputItem, SelectInput, SubmitInput };
