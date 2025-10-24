import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ChartWrapper from "./ChartWrapper";
import { useLiveDataContext } from "../hooks/useLiveData.jsx";

export default function PieChartCard() {
  const { data } = useLiveDataContext();
  if (!data) return <div>Loading...</div>;

  const breakdown = [
    { name: "Bitcoin", value: data.breakdown.btc },
    { name: "Ethereum", value: data.breakdown.eth },
  ];

  const COLORS = ["#facc15", "#38bdf8"];

  return (
    <ChartWrapper title="Market Dominance (%)">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={breakdown}
            outerRadius={80}
            dataKey="value"
            stroke="#0f172a"
            strokeWidth={2}
          >
            {breakdown.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
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
            wrapperStyle={{
              fontSize: "0.75rem",
              color: "#94a3b8",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
