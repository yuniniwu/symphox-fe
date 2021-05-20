import { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import userIcon from '../../icons/user.svg';
import DropDown from '../../components/DropDown';
import { AuthContext } from '../../constants/context';
import QueryOrder from '../../components/QueryOrder';

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const NavItem = styled.div`
  margin: 1rem 1rem 0 0;
  & a > img {
    box-sizing: border-box;
    min-width: 36px;
    min-height: 36px;
    width: 4vw;
    height: 4vw;
  }
`;

const dropDownOption = [
  { to: '/appendOrder', content: '新增訂單' },
  { to: '/queryOrder', content: '訂單查詢' },
];

export default function HomePage() {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  if (!user) {
    history.push('/login');
  }

  return (
    <Container>
      {user && (
        <>
          <NavItem>
            <DropDown outerText='訂單管理' innerOption={dropDownOption} />
          </NavItem>

          <QueryOrder />

          <NavItem>
            <a href='/login'>
              <img src={userIcon} alt='我的帳戶' />
            </a>
          </NavItem>
        </>
      )}
    </Container>
  );
}
