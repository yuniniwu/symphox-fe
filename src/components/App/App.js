import styled from 'styled-components';
import { GlobalStyle } from '../../constants/style';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import AppendOrderPage from '../../pages/AppendOrderPage';
import QueryOrderPage from '../../pages/QueryOrderPage';
import { AuthContext } from '../../constants/context';
import { getAuthToken } from '../../utils';
import { getMe } from '../../WebAPI';

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  font-size: 1rem;
`;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (getAuthToken())
      getMe().then((res) => {
        if (res.ok) {
          setUser(res.data);
        }
      });
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        {/* 
          basename='/symphox-fe/login'
      */}
        <Router>
          <>
            <GlobalStyle />
            <Container>
              {/* router */}
              <Switch>
                <Route path='/login'>
                  <LoginPage />
                </Route>
                <Route exact path='/'>
                  <HomePage />
                </Route>
                <Route path='/queryOrder'>
                  <QueryOrderPage />
                </Route>
                <Route path='/appendOrder'>
                  <AppendOrderPage />
                </Route>
              </Switch>
            </Container>
          </>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
