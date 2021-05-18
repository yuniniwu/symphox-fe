import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../constants/style';
import { useHistory } from 'react-router-dom';

const bg_main = theme.colors.bg_main;
const bg_card = theme.colors.bg_card;

const Container = styled.div`
  max-width: 360px;
  margin: 0 auto;
  padding: 30px;
  font-size: 1rem;
  background-color: ${bg_main};
`;

const LoginForm = styled.form`
  border: 1px solid #000;
  border-radius: 10px;
  overflow: hidden;
`;

const LoginHead = styled.p`
  background-color: ${bg_card};
  padding: 0.5rem;
`;

const LoginBody = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
`;

const TextInput = styled.input`
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
`;

const SubmitInput = styled.input`
  align-self: flex-end;
  flex: 0;
  border: none;
  box-sizing: border-box;
  padding: 0.4rem 1.6rem;
  background: #555;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #222;
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

const ErrorMessage = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  color: red;
`;

export default function LoginPage() {
  const [inputValue, setInputValue] = useState({
    username: '',
    password: '',
  });
  const [hasError, setHasError] = useState('');
  const history = useHistory();
  // disabled submit button or not
  const [isDisabled, setIsDisabled] = useState(false);
  const errMessage = '帳號或密碼輸入錯誤';
  const { username, password } = inputValue;

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      return setHasError(true);
    }
    if (!validateUser(username, password)) {
      return setHasError(true);
    }
    setHasError(false);
    // Linked to HomePage
    history.push('/');
  };

  // Validate if inputValue equals required value
  const validateUser = (username, password) => {
    const requiredUsername = 'test@mail.com';
    const requiredPassword = '12345';

    if (username === requiredUsername && password === requiredPassword)
      return true;
    return false;
  };

  const handleFocus = () => {
    setHasError(false);
    setIsDisabled(false);
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <LoginHead>登入</LoginHead>
        <LoginBody>
          <TextInput
            type='email'
            value={username}
            name='username'
            placeholder='輸入帳號'
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <TextInput
            type='password'
            value={password}
            name='password'
            placeholder='輸入密碼'
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <SubmitInput type='submit' value={'Login'} disabled={isDisabled} />
          {hasError && <ErrorMessage>{errMessage}</ErrorMessage>}
        </LoginBody>
      </LoginForm>
    </Container>
  );
}
