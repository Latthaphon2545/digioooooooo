export default function Card() {
  return (
    <div className="card card-side bg-base-100 shadow-xl mx-20 mt-5">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">M920</h2>
        {stat()}
        <div className="card-actions justify-end mt-3">
          <button className="btn btn-primary">Watch</button>
        </div>
      </div>
    </div>
  );
}

const status = [
  { status: "Installed", value: 12 },
  { status: "In Stock", value: 22 },
  { status: "Lost", value: 23 },
  { status: "Damaged", value: 44 },
  { status: "Repairing", value: 33 },
  { status: "Waiting for Repair", value: 66 },
];

const stat = () => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
      {status.map((stat, index) => {
        return (
          <div key={index} className="stat">
            <div className={`stat-title text-sm`}>{stat.status}</div>
            <div className="stat-value text-2xl">{stat.value}</div>
          </div>
        );
      })}
    </div>
  );
};
