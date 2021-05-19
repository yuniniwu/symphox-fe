import { useState } from 'react';
import styled from 'styled-components';
import plusIcon from '../../icons/plus.svg';
import useForm from '../../hooks/useForm';
import { InputItem, SelectInput } from './InputItem';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

const FieldWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
`;

const InputFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin: 1rem;

  & + & {
    border-bottom: 1px solid #ccc;
  }
`;

function InputField() {
  const { product_name, logo_url, order_status, hasError, handleInputChange } =
    useForm();

  return (
    <>
      <InputWrapper>
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
      <InputWrapper>test</InputWrapper>
      <InputWrapper>test</InputWrapper>
    </>
  );
}

const MoreFieldButton = styled.img`
  margin: 1rem;
  width: 36px;
  height: 36px;
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
  const [isDisabled, setIsDisabled] = useState(false);
  const { handleSubmit } = useForm();

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
        <FieldWrapper>
          <InputFieldWrapper>
            <InputField />
          </InputFieldWrapper>

          <MoreFieldButton src={plusIcon} />
        </FieldWrapper>
        <SubmitInput type='submit' value='新增' disabled={isDisabled} />
      </FormWrapper>
    </Container>
  );
}
