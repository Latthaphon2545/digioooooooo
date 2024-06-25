import { ConvertStatus } from "../convertStatusAndRole";

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
    <div className="carousel rounded-box w-full">
      {products.map((item) => (
        <div className={`carousel-item ${item.bg} w-full`}>
          <div className="flex flex-col p-7 gap-3 justify-center items-center w-full">
            <div className="grid grid-cols-1 stats stats-vertical bg-white bg-opacity-90 w-full">
              <h1 className="text-4xl text-center font-bold">{item.name}</h1>
              {Object.keys(item.status).map((key) => (
                <div className="stat">
                  <div className="stat-title text-base text-black">
                    {ConvertStatus(key)}
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
