// import { useState } from 'react';
import styled from 'styled-components';
import { theme, MEDIA_QUERY_S } from '../../constants/style';
// import { useHistory } from 'react-router-dom';
import square from '../../icons/square.svg';
import user from '../../icons/user.svg';
import useRWD from '../../hooks/useRWD';
import DropDown from '../../components/DropDown';
import AppendOrder from '../../components/AppendOrder';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;

  ${MEDIA_QUERY_S} {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background-color: yellow;
  }
`;

const NavItem = styled.div`
  margin: 1rem 1rem 0 0;
  & a > img {
    width: 4vw;
    height: 4vw;
  }
`;

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
        {!isMobile(device) && <AppendOrder></AppendOrder>}
        <NavItem>
          <a href='/login'>
            <img src={user} alt='我的帳戶' />
          </a>
        </NavItem>
      </NavBar>
    </>
  );
}
