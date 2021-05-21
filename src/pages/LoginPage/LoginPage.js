import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { login, getMe } from '../../WebAPI';
import { setAuthToken } from '../../utils.js';
import { AuthContext } from '../../constants/context';

const Container = styled.div`
  max-width: 360px;
  margin: 0 auto;
  padding: 30px;
  font-size: 1rem;
`;

const LoginForm = styled.form`
  border: 1px solid #000;
  border-radius: 10px;
  overflow: hidden;
`;

const LoginHead = styled.p`
  background-color: #eee;
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
  const { user, setUser } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState({
    username: '',
    password: '',
  });
  const [hasError, setHasError] = useState('');

  // disable submit button
  const [isDisabled, setIsDisabled] = useState(false);
  const history = useHistory();
  const errMessage = '請輸入帳號密碼';
  const { username, password } = inputValue;

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [history, user]);

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

    login(username, password).then((data) => {
      if (!data.ok) {
        setIsDisabled(true);
        return alert(data.message);
      }

      setAuthToken(data.token);

      getMe().then((res) => {
        if (res.ok !== 1) {
          setAuthToken(null);
          setIsDisabled(true);
          return alert(data.message);
        }
        setUser(res.data);
      });

      history.push('/');
    });

    setInputValue({
      username: '',
      password: '',
    });
    setIsDisabled(false);
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
