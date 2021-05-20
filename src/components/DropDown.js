import styled from 'styled-components';
import { useState } from 'react';
import dropDownArrow from '../icons/drop-down-arrow.svg';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  border: 1px solid black;
  padding: 0.5rem;
  margin: 1rem 0 0 1rem;
`;

const OuterText = styled.p`
  cursor: pointer;

  & img {
    padding-right: 0.2rem;
  }
`;

const Option = styled(Link)`
  margin-top: 1rem;
  text-align: center;
  text-decoration: none;
  color: black;
  display: block;
`;

export default function DropDown({ outerText, innerOption }) {
  const [isShow, setIsShow] = useState(false);

  const handleIsShow = () => {
    setIsShow(!isShow);
  };

  return (
    <Wrapper>
      <OuterText onClick={handleIsShow}>
        <img src={dropDownArrow} alt='drop-Down-Arrow-icon' />
        {outerText}
      </OuterText>
      {isShow && (
        <>
          {innerOption.map((item, index) => {
            return (
              <Option to={item.to} key={index}>
                {item.content}
              </Option>
            );
          })}
        </>
      )}
    </Wrapper>
  );
}
