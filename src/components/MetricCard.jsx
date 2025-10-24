export default function MetricCard({ label, value, delta, unit, good }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2 min-w-[140px]">
      <span className="text-xs uppercase text-slate-400 tracking-wide">
        {label}
      </span>

      <div className="text-2xl font-semibold text-slate-100 flex items-baseline gap-1">
        <span>{value}</span>
        {unit && <span className="text-sm text-slate-500">{unit}</span>}
      </div>

      <div
        className={`text-xs font-medium ${
          good ? "text-emerald-400" : "text-rose-400"
        }`}
      >
        {good ? "▲" : "▼"} {delta}
      </div>
    </div>
  );
}
