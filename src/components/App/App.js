import styled from 'styled-components';
import { GlobalStyle } from '../../constants/style';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  /* padding-top: 64px; */
  font-size: 1rem;
`;

function App() {
  return (
    <>
      {/* 
          <AuthContext.Provider value={{ user, setUser }}> 
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
              {/* <Route path='/queryOrder'>
                <QueryOrderPage />
              </Route>
              <Route path='/addOrder'>
                <AddOrderPage />
              </Route> */}
            </Switch>
          </Container>
        </>
      </Router>
      {/* </AuthContext.Provider> */}
    </>
  );
}

export default App;
