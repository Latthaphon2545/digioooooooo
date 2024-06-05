const StatStatus = (status: Record<string, string>) => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
      {Object.entries(status).map(([key, value], index) => (
        <div key={index} className="stat">
          <div className="stat-title text-sm">{key}</div>
          <div className="stat-value text-2xl">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatStatus;
