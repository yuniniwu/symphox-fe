import styled from 'styled-components';
import plusIcon from '../../icons/plus.svg';
import useForm from '../../hooks/useForm';
import { InputItem, SelectInput, SubmitInput } from './InputItem';

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

function InputField({
  groupId,
  order,
  hasError,
  handleInputChange,
  handleFocus,
}) {
  const { name, logo, status } = order;

  return (
    <>
      <InputWrapper>
        <InputItem
          type={'text'}
          name={'name'}
          value={name}
          question={'商品名稱：'}
          handleInputChange={handleInputChange}
          hasError={hasError}
          errorMessage={'請輸入商品名稱'}
          handleFocus={handleFocus}
          groupId={groupId}
        />
        <InputItem
          type={'url'}
          name={'logo'}
          value={logo}
          question={'圖示連結：'}
          handleInputChange={handleInputChange}
          hasError={hasError}
          errorMessage={'請輸入圖示連結'}
          handleFocus={handleFocus}
          groupId={groupId}
        />
        <SelectInput
          type={'select'}
          name={'status'}
          value={status.type}
          question={'訂單狀態：'}
          options={['已取消', '已成立', '處理中', '已送達']}
          handleInputChange={handleInputChange}
          hasError={hasError}
          errorMessage={'請選擇訂單狀態'}
          handleFocus={handleFocus}
          groupId={groupId}
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

export default function AppendOrder() {
  const {
    fields,
    hasError,
    isDisabled,
    addChild,
    handleInputChange,
    handleSubmit,
    handleFocus,
  } = useForm();

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit}>
        <FieldWrapper>
          <InputFieldWrapper>
            {fields.map((field, index) => (
              <InputField
                key={index}
                groupId={index}
                order={field}
                hasError={hasError}
                handleInputChange={handleInputChange}
                handleFocus={handleFocus}
              />
            ))}
          </InputFieldWrapper>
          <MoreFieldButton src={plusIcon} onClick={addChild} />
        </FieldWrapper>
        <SubmitInput type='submit' value='新增' disabled={isDisabled} />
      </FormWrapper>
    </Container>
  );
}
