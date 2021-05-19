import styled from 'styled-components';
import DropDown from '../DropDown';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
`;

const SelectStatus = styled.div`
  display: flex;
  margin-right: 1rem;
  align-self: start;
`;

const OrderWrapper = styled.div``;

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
  border: 1px solid #ccc;
  margin: 0.5rem;
`;

const ItemLogo = styled.img`
  width: 36px;
  height: 36px;
  margin: 0.5rem;
  border-radius: 50%;
`;

const ItemDetail = styled.div``;

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
  const data = {
    orders: [
      {
        name: 'Livi優活 抽取式衛生紙(100抽x10包x10串/箱)',
        logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
        status: {
          code: 3,
          type: '已取消',
        },
        date: '107/6/12',
      },
      {
        name: 'BALMUDA The Toaster 百慕達烤麵包機-黑色',
        logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
        status: {
          code: 2,
          type: '已成立',
        },
        date: '108/7/21',
      },
      {
        name: '贈-短慧萬用鍋HD2133+三合一濾網「LG樂金」韓國原裝...',
        logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
        status: {
          code: 1,
          type: '處理中',
        },
        date: '108/6/2',
      },
      {
        name: 'Apple AirPds 2',
        logo: 'https://static.oopocket.com/store/iconTreemall@3x.png',
        status: {
          code: 4,
          type: '已送達',
        },
        date: '108/3/02',
      },
    ],
  };

  return (
    <>
      <Container>
        <SelectStatus>
          訂單狀態：
          <DropDown
            outerText={'Select'}
            innerOption={[
              { content: '全部顯示' },
              { content: '進行中' },
              { content: '已完成' },
            ]}
          ></DropDown>
        </SelectStatus>
        <OrderWrapper>
          <OrderHeading>
            <p>進行中</p>
          </OrderHeading>
          {data.orders.map((item) => {
            return <OrderList item={item}></OrderList>;
          })}
          <OrderHeading>
            <p>已完成</p>
          </OrderHeading>
          {data.orders.map((item) => {
            return <OrderList item={item}></OrderList>;
          })}
        </OrderWrapper>
      </Container>
    </>
  );
}
