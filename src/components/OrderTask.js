import styled from 'styled-components';
import { useState } from 'react';
import dropDownArrow from '../icons/drop-down-arrow.svg';

const Wrapper = styled.div`
  border: 1px solid black;
  padding: 1rem;
`;
const OuterText = styled.p`
  cursor: pointer;
  & img {
    padding-right: 0.2rem;
  }
`;
const Option = styled.p`
  margin-top: 1rem;
  text-align: center;
`;

export default function OrderTask() {
  const [isShow, setIsShow] = useState(false);

  const handleIsShow = () => {
    setIsShow(!isShow);
  };
  return (
    <Wrapper>
      <OuterText onClick={handleIsShow}>
        <img src={dropDownArrow} alt='drop-Down-Arrow-icon' />
        訂單管理
      </OuterText>
      {isShow && (
        <>
          <Option>訂單查詢</Option>
          <Option>新增訂單</Option>
        </>
      )}
    </Wrapper>
  );
}
