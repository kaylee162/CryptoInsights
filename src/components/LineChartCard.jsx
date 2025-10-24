import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import ChartWrapper from "./ChartWrapper";
import { useLiveDataContext } from "../hooks/useLiveData.jsx";

export default function LineChartCard() {
  const { data } = useLiveDataContext();
  const [coin, setCoin] = useState("bitcoin");

  if (!data) return <div>Loading chart...</div>;

  const chartData = data.history.map((pt) => ({
    time: new Date(pt.t).toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit",
    }),
    price: pt[coin],
  }));

  return (
    <ChartWrapper
      title={`${coin === "bitcoin" ? "Bitcoin" : "Ethereum"} Price (USD)`}
      action={
        <select
          className="bg-slate-800 text-slate-100 text-xs rounded-lg px-2 py-1 border border-slate-700 outline-none"
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
        >
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
        </select>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
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
          <Line
            type="monotone"
            dataKey="price"
            stroke={coin === "bitcoin" ? "#facc15" : "#38bdf8"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
