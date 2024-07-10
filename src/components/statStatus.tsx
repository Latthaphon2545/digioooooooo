export const StatStatus = ({ status }: { status: Record<string, string> }) => {
  return (
    <div className="stats stats-horizontal shadow w-full tablet:grid-rows-2 laptop:grid-rows-1 mobile:grid-rows-4">
      {Object.entries(status).map(([key, value], index) => (
        <div key={index} className="stat">
          <div className="stat-desc">{key}</div>
          <div className="stat-value text-2xl">{value}</div>
        </div>
      ))}
    </div>
  );
};
