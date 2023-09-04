import { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useLocation,
  useParams,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { styled } from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../theme";
import { useRecoilState, useRecoilValue } from "recoil";
import { HomeButton, ThemeButton } from "../Button";
import { isDarkAtom } from "../atoms";

interface RouteParams {
  coinId: string;
}

const Container = styled.div`
  display: block;
  background-color: ${(props) => props.theme.bgColor};
  padding: 0px 10px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteState {
  name: string;
}

//타입스크립트에 오브젝트 구조 알려줘야 하는 것.. 타입스크립트 불편한 부분 중 하나.
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface IPriceInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.cardColor};
  padding: 20px 30px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  color: ${(props) => props.theme.textColor};
  span:first-child {
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
  font-size: 20px;
  color: ${(props) => props.theme.textColor};
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isactive: boolean }>`
  text-transform: uppercase;
  background-color: ${(p) => p.theme.cardColor};
  border-radius: 10px;
  text-align: center;
  color: ${(props) =>
    props.isactive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 10px;
    display: block;
  }
`;

function Coin() {
  const isDark = useRecoilValue(isDarkAtom);

  const { coinId } = useParams<RouteParams>(); // url 파라미터.
  const { state } = useLocation<RouteState>(); // 화면 간  데이터 넘기는 방법.
  const priceMatch = useRouteMatch("/:coinId/price"); // useRouteMatch() => Object or null
  const chartMatch = useRouteMatch("/:coinId/chart"); //     특정 url에 있는지 알려주는 훅.

  // useQuery는 unique key 가지고 있어야 함. => 키에 각각 "info", "tickers"를 추가해주고 어레이로 만듦.
  //     isLoading, data의 이름을 아래처럼 해서 이름을 각각 바꾸어 줌.(js 문법.)
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
    // {
    //   refetchInterval: 10000,
    // }
  );
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<IPriceInfoData>(
      ["tickers", coinId],
      () => fetchCoinTickers(coinId)
      // {
      //   refetchInterval: 10000,
      // }
    );
  const loading = infoLoading || tickersLoading;
  console.log(infoData);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Container>
        <Helmet>
          <title>
            {state?.name ? state.name : loading ? "Loading.." : infoData?.name}
          </title>
        </Helmet>

        <HomeButton />
        <ThemeButton />

        <Header>
          <Title>
            {state?.name ? state.name : loading ? "Loading.." : infoData?.name}
          </Title>
        </Header>
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <div>
            <Overview>
              <OverviewItem>
                <span>Rank</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol</span>
                <span>{infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Price</span>
                <span>
                  {tickersData?.quotes.USD.price.toFixed(2).toString() + "$"}
                </span>
              </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Supply</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>

            <Tabs>
              <Tab isactive={chartMatch !== null}>
                {" "}
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isactive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>

            <Switch>
              <Route path={`/${coinId}/price`}>
                <Price data={tickersData} />
              </Route>
              <Route path={`/${coinId}/chart`}>
                <Chart coinId={coinId} />
              </Route>
            </Switch>
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
}
export default Coin;
