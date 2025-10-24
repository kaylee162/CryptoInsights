import Header from "./components/Header";
import MetricCards from "./components/MetricCards";
import LineChartCard from "./components/LineChartCard";
import BarChartCard from "./components/BarChartCard";
import PieChartCard from "./components/PieChartCard";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8">
      <Header />
      <MetricCards />

      <section className="grid gap-8 md:grid-cols-2">
        <LineChartCard />
        <BarChartCard />
        <PieChartCard />
      </section>
    </div>
  );
}

export default App;
