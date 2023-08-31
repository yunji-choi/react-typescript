import { styled } from "styled-components";
import { IPriceInfoData } from "./Coin";

const Container = styled.div`
  /* background-color: red; */
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

function Price(props: { data?: IPriceInfoData }) {
  console.log(props.data);
  return (
    <Container>
      <p>circulating_supply - ${props.data?.circulating_supply}</p>
      <p>market_cap - ${props.data?.quotes.USD.market_cap}</p>
      <p>percent_change_24h - {props.data?.quotes.USD.percent_change_24h} %</p>
    </Container>
  );
}
export default Price;
