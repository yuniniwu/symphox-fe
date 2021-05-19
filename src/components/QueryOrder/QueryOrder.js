import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SelectInput } from '../../components/AppendOrder/InputItem';
import { getOrders } from '../../WebAPI';

const Container = styled.div`
  max-width: 960px;
  max-height: 768px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  margin-top: 1rem;
  padding: 2rem;
`;

const SelectStatus = styled.div`
  display: flex;
  margin-right: 1rem;
  align-self: start;
`;

const OrderWrapper = styled.div`
  border: 1px solid #ccc;
`;

const OrderHeading = styled.h3`
  background-color: #ddd;
  padding: 0.5rem;

  & p {
    border-left: 5px solid green;
    padding-left: 0.5rem;
  }
`;

const OrderContent = styled.div`
  display: flex;
  padding: 0.5rem 0;
  & + & {
    border-top: 1px solid #ccc;
  }
`;

const ItemLogo = styled.img`
  width: 4vw;
  height: 4vw;
  margin: 0.5rem;
  border-radius: 50%;
`;

const ItemDetail = styled.div`
  flex: 1;
  margin: 0 0.5rem;
`;

const ItemTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ItemStatus = styled.p`
  color: green;
`;

const ItemTimeStamp = styled.p``;

const ItemName = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const OrderList = ({ item }) => {
  return (
    <OrderContent>
      <ItemLogo src={item.logo}></ItemLogo>
      <ItemDetail>
        <ItemTitle>
          <ItemStatus>{item.status.type}</ItemStatus>
          <ItemTimeStamp>預計出貨：{item.date}</ItemTimeStamp>
        </ItemTitle>
        <ItemName>{item.name}</ItemName>
      </ItemDetail>
    </OrderContent>
  );
};

export default function QueryOrder() {
  const [orders, setOrders] = useState([]);
  const filterType = ['全部顯示', '進行中', '已完成'];

  useEffect(() => {
    getOrders().then((orders) => setOrders(orders));
  }, []);

  return (
    <>
      {console.log(orders)}
      {getOrders().then}
      <Container>
        <SelectStatus>
          <SelectInput
            type={'select'}
            name={'order_status'}
            defaultValue={'Select'}
            question={'訂單狀態：'}
            option={filterType}
            errorMessage={'請選擇訂單狀態'}
          />
        </SelectStatus>
        <OrderWrapper>
          <OrderHeading>
            <p>進行中</p>
          </OrderHeading>
          {/* {data.orders.map((item, index) => {
            return <OrderList key={index} item={item}></OrderList>;
          })}
          <OrderHeading>
            <p>已完成</p>
          </OrderHeading>
          {data.orders.map((item, index) => {
            return <OrderList key={index} item={item}></OrderList>;
          })} */}
        </OrderWrapper>
      </Container>
    </>
  );
}
