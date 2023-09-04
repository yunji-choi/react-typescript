import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilState, useRecoilValue } from "recoil";
import { lightTheme } from "../theme";
import { isDarkAtom } from "../atoms";

interface IChartProps {
  coinId: string;
}

interface IHistoricalData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: IChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
    // { refetchInterval: 10000 } //세 번째 argument로, refetch interval을 설정할 수 있다.
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : data?.length ? (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map((p) => ({
                  x: p.time_close * 1000,
                  y: [p.open, p.high, p.low, p.close],
                })) ?? [],
            },
          ]}
          options={{
            xaxis: {
              type: "datetime",
              labels: { datetimeFormatter: { month: "mmm 'yy" } },
            },
            theme: {
              mode: isDark ? "dark" : "light",
            },
          }}
        ></ApexChart>
      ) : (
        <h1>No data</h1>
      )}
    </div>
  );
}
export default Chart;
