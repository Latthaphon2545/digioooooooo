interface Product {
  name: string;
  status: {
    INSTOCK: number;
    INSTALLED: number;
    INSTALLING: number;
    REPARING: number;
    DAMAGED: number;
    LOST: number;
    WAITREPAIR: number;
  };
  bg: string;
}

interface SliceProps {
  products: Product[];
}

export default function lice({ products }: SliceProps) {
  return (
    <div className="carousel rounded-box w-96">
      {products.map((item) => (
        <div className={`carousel-item ${item.bg} w-full`}>
          <div className="flex flex-col p-7 gap-3">
            <h1 className="text-4xl text-center font-bold">{item.name}</h1>
            <div className="grid grid-cols-1 stats stats-vertical bg-white bg-opacity-95 w-[21vw]">
              {Object.keys(item.status).map((key) => (
                <div className="stat">
                  <div className="stat-title text-base text-black">
                    {convertStatus(key)}
                  </div>
                  <div className="stat-figure text-black text-3xl font-bold">
                    {item.status[key as keyof typeof item.status]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const convertStatus = (status: string) => {
  status = status.toUpperCase();
  let showStatus = "";
  if (status === "INSTOCK") {
    showStatus = "In Stock";
  } else if (status === "LOST") {
    showStatus = "Lost";
  } else if (status === "DAMAGED") {
    showStatus = "Damaged";
  } else if (status === "REPARING") {
    showStatus = "Reparing";
  } else if (status === "WAITREPAIR") {
    showStatus = "Waiting For Repair";
  } else if (status === "INSTALLED") {
    showStatus = "Installed";
  } else if (status === "INSTALLING") {
    showStatus = "Installing";
  }
  return showStatus;
};
