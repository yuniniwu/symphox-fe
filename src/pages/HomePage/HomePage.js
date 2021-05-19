// import { useState } from 'react';
import styled from 'styled-components';
import { theme, MEDIA_QUERY_S } from '../../constants/style';
// import { useHistory } from 'react-router-dom';
import square from '../../icons/square.svg';
import user from '../../icons/user.svg';
import useRWD from '../../hooks/useRWD';
import DropDown from '../../components/DropDown';

const bg_main = theme.colors.bg_main;
// const bg_card = theme.colors.bg_card;

const Container = styled.div`
  max-width: 360px;
  margin: 0 auto;
  padding: 30px;
  font-size: 1rem;
  background-color: ${bg_main};
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;

  ${MEDIA_QUERY_S} {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background-color: yellow;
  }
`;

const NavItem = styled.div``;

export default function HomePage() {
  const device = useRWD();
  const isMobile = (device) => {
    if (device !== 'mobile') return false;
    return true;
  };

  return (
    <>
      <NavBar>
        <NavItem>
          {!isMobile(device) ? (
            <DropDown
              outerText='訂單管理'
              innerOption={[
                { to: '/appendOrder', content: '新增訂單' },
                { to: '/queryOrder', content: '訂單查詢' },
              ]}
            />
          ) : (
            <img src={square} alt='選單' />
          )}
        </NavItem>
        {!isMobile(device) && <Container>HomePage</Container>}
        <NavItem>
          <a href='/login'>
            <img src={user} alt='我的帳戶' />
          </a>
        </NavItem>
      </NavBar>
    </>
  );
}
