import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import ChartWrapper from "./ChartWrapper";
import { useLiveDataContext } from "../hooks/useLiveData.jsx";

export default function BarChartCard() {
  const { data } = useLiveDataContext();

  // 👇 If no data yet, show loading placeholder
  if (!data || !data.history) {
    return (
      <ChartWrapper title="Requests vs Errors">
        <div className="flex items-center justify-center h-full text-slate-500 text-sm">
          Loading data...
        </div>
      </ChartWrapper>
    );
  }

  const recent = data.history.slice(-10).map((pt) => ({
    time: new Date(pt.t).toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit",
    }),
    reqPerMin: pt.bitcoin, // or whatever metric you want to compare
    errors: pt.ethereum,   // we'll rename this soon
  }));

  return (
    <ChartWrapper title="BTC vs ETH Price Comparison (USD)">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={recent}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="time" stroke="#94a3b8" minTickGap={20} />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "0.5rem",
              color: "#fff",
              fontSize: "0.8rem",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "0.75rem", color: "#94a3b8" }}
          />
          <Bar
            dataKey="reqPerMin"
            name="Bitcoin (USD)"
            fill="#facc15"
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
          <Bar
            dataKey="errors"
            name="Ethereum (USD)"
            fill="#38bdf8"
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
