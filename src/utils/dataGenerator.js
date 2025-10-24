function nudge(prev, min, max, step = 5) {
  const change = Math.random() * step * 2 - step;
  let next = prev + change;
  return Math.round(Math.max(min, Math.min(max, next)));
}

function baseState() {
  const now = Date.now();
  const history = Array.from({ length: 20 }).map((_, i) => ({
    t: now - (19 - i) * 5000,
    cpu: 30 + Math.random() * 30,
    reqPerMin: 800 + Math.random() * 400,
    errors: Math.random() * 10,
  }));

  return {
    metrics: {
      activeUsers: { current: 1200, change: "+32", trend: "up" },
      requestsPerMin: { current: 1020, change: "+5%", trend: "up" },
      cpu: { current: 42, change: "-3%", trend: "down" },
      errorsPerMin: { current: 4, change: "-1", trend: "down" },
    },
    history,
    breakdown: { web: 58, mobile: 27, api: 15 },
  };
}

let current = baseState();

export function generateNextSnapshot(prevState = current) {
  const next = JSON.parse(JSON.stringify(prevState));

  next.metrics.activeUsers.current = nudge(next.metrics.activeUsers.current, 900, 2000, 40);
  next.metrics.requestsPerMin.current = nudge(next.metrics.requestsPerMin.current, 600, 2000, 60);
  next.metrics.cpu.current = nudge(next.metrics.cpu.current, 10, 95, 4);
  next.metrics.errorsPerMin.current = nudge(next.metrics.errorsPerMin.current, 0, 20, 2);

  const now = Date.now();
  const lastPoint = next.history[next.history.length - 1];
  const newPoint = {
    t: now,
    cpu: nudge(lastPoint.cpu, 10, 95, 4),
    reqPerMin: nudge(lastPoint.reqPerMin, 600, 2000, 60),
    errors: nudge(lastPoint.errors, 0, 20, 2),
  };

  next.history.push(newPoint);
  if (next.history.length > 20) next.history.shift();

  next.breakdown.web = nudge(next.breakdown.web, 30, 70, 2);
  next.breakdown.mobile = nudge(next.breakdown.mobile, 10, 40, 2);
  next.breakdown.api = 100 - next.breakdown.web - next.breakdown.mobile;

  current = next;
  return next;
}
