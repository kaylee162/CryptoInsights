import MetricCard from "./MetricCard";
import { useLiveDataContext } from "../hooks/useLiveData.jsx";

export default function MetricCards() {
  const { data } = useLiveDataContext();
  if (!data) return <div>Loading live crypto data...</div>;

  const { metrics } = data;

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        label="Bitcoin (BTC)"
        value={`$${metrics.bitcoin.current}`}
        delta={metrics.bitcoin.change}
        good={metrics.bitcoin.trend === "up"}
      />
      <MetricCard
        label="Ethereum (ETH)"
        value={`$${metrics.ethereum.current}`}
        delta={metrics.ethereum.change}
        good={metrics.ethereum.trend === "up"}
      />
    </section>
  );
}
