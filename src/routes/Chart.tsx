import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

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
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 } //세 번째 argument로, refetch interval을 설정할 수 있다.
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: `${coinId}`,
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: { height: 500, width: 500, toolbar: { show: false } },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["purple"], stops: [0, 100] },
            },
            colors: ["pink"],
            // yaxis: { show: false },
            xaxis: {
              categories: data?.map((price) => price.time_close * 1000) ?? [],
              type: "datetime",
              labels: { datetimeFormatter: { month: "mmm 'yy" } },
            },
            tooltip: {
              x: {
                format: "dd/MM/yy HH:mm",
              },
              y: {
                formatter: (v) => `$ ${v.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
