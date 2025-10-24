export default function ChartWrapper({ title, children, action }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-slate-100 font-medium">{title}</h2>
          <p className="text-slate-500 text-xs">
            Live data • updates every few seconds
          </p>
        </div>

        {action && <div>{action}</div>}
      </div>

      <div className="w-full h-[240px]">{children}</div>
    </div>
  );
}
