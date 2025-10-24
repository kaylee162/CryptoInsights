import { useLiveDataContext } from "../hooks/useLiveData.jsx";

export default function Header() {
  const data = useLiveDataContext();
  if (!data) return <div>Loading header...</div>;
  const { lastUpdated } = data;

  return (
    <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
          Crypto Insights Dashboard
        </h1>
        <p className="text-slate-400 text-sm">Real-time price trends and analytics</p>
      </div>

      <div className="text-sm text-slate-400">
        <span className="block md:text-right">
          Last update:{" "}
          <span className="text-slate-200 font-medium">{lastUpdated}</span>
        </span>
      </div>
    </header>
  );
}
