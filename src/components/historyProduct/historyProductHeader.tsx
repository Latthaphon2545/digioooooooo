interface HaederProps {
  data: {
    [key: string]: any;
  }[];
}

export default function Header({ data }: HaederProps) {
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl w-1/3 mt-3">
        <figure className="w-28">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
            alt="Movie"
            width={50}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {data[0].model}
            <span className="text-xs text-gray-400">({data[0].serialNumber})</span>
          </h2>
          <p className="flex flex-col">
            <span>{data[0].status}</span>
            <span>{data[0].merchant}</span>
          </p>
        </div>
      </div>
    </>
  );
}
