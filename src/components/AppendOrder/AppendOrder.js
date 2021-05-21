import { useState } from 'react';
import styled from 'styled-components';
import plusIcon from '../../icons/plus.svg';
import useForm from '../../hooks/useForm';
import { InputItem, SelectInput } from './InputItem';

const Container = styled.div`
  max-width: 960px;
  max-height: 768px;
  margin: 0 auto;
  width: 50vw;
  height: 100vh;
`;

const FormWrapper = styled.form`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const FieldWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  flex-grow: 1;
`;

const InputFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  padding: 1rem;

  & + & {
    border-top: 1px solid #ccc;
  }
`;

function InputField({ fieldId }) {
  const { product_name, logo_url, order_status, hasError, handleInputChange } =
    useForm();

  return (
    <>
      <InputWrapper>
        {console.log(fieldId)}
        <InputItem
          type={'text'}
          name={'product_name'}
          value={product_name}
          question={'商品名稱：'}
          handleInputChange={handleInputChange}
          hasError={hasError}
          errorMessage={'請輸入商品名稱'}
        />
        <InputItem
          type={'url'}
          name={'logo_url'}
          value={logo_url}
          question={'圖示連結：'}
          handleInputChange={handleInputChange}
          hasError={hasError}
          errorMessage={'請輸入圖示連結'}
        />
        <SelectInput
          type={'select'}
          name={'order_status'}
          value={order_status}
          question={'訂單狀態：'}
          option={['已取消', '已成立', '處理中', '已送達']}
          handleInputChange={handleInputChange}
          hasError={hasError}
          errorMessage={'請選擇訂單狀態'}
        />
      </InputWrapper>
    </>
  );
}

const MoreFieldButton = styled.img`
  margin: 1rem;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  box-shadow: 2px 2px 10px #555;
  cursor: pointer;
`;

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

export default function AppendOrder() {
  const [groupId, setGroupId] = useState(1);
  const { isDisabled, handleSubmit } = useForm();
  let array = new Array(groupId).fill('');

  const addChild = () => {
    setGroupId((prevState) => prevState + 1);
  };

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
        <FieldWrapper>
          <InputFieldWrapper>
            {array.map((_, index) => (
              <InputField key={index} fieldId={index} />
            ))}
          </InputFieldWrapper>
          <MoreFieldButton src={plusIcon} onClick={addChild} />
        </FieldWrapper>
        <SubmitInput type='submit' value='新增' disabled={isDisabled} />
      </FormWrapper>
    </Container>
  );
}
