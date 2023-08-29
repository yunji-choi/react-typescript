// fetcher functions 파일 분리

// 꼭 fetch promise를 리턴해 줘야 함 (json data의 프로미스)

const BASE_URL = "https://api.coinpaprika.com/v1";
const BASE_URL_PH = "https://ohlcv-api.nomadcoders.workers.dev";

export async function fetchCoins() {
  return await fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export async function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinHistory(coinId: string) {
  return fetch(`${BASE_URL_PH}?coinId=${coinId}`).then((r) => r.json());
}
