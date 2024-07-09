import Link from "next/link";
import { ConvertStatus } from "../convertStatusAndRole";
import { ColorProductStatus } from "../table/color";

interface Product {
  status: {
    INSTOCK: number;
    INSTALLED: number;
    INSTALLING: number;
    REPARING: number;
    DAMAGED: number;
    LOST: number;
    WAITREPAIR: number;
  };
  image: string;
}

interface ProductsData {
  [key: string]: Product;
}

interface SliceProps {
  bankName: string;
  productsData: ProductsData;
}

export default function Slice({ bankName, productsData }: SliceProps) {
  return (
    <div className="w-full">
      <div className="flex flex-nowrap overflow-y-auto gap-3 mx-5">
        {Object.keys(productsData).map((productName, index) => (
          <Link href={`#${bankName}-${index}`} key={index}>
            <button key={index} className={`btn btn-outline btn-xs `}>
              {productName}
            </button>
          </Link>
        ))}
      </div>

      <div className="carousel rounded-box w-full">
        {Object.keys(productsData).map((productName, index) => (
          <div
            key={index}
            className={`carousel-item  w-full`}
            id={`${bankName}-${index}`}
          >
            <div className="flex flex-col px-7 gap-3 justify-center items-center w-full">
              <div className="grid grid-cols-1 stats stats-vertical  w-full">
                {Object.keys(productsData[productName].status).map(
                  (statusKey, statusIndex) => (
                    <div key={statusIndex} className="stat">
                      <div className="stat-title text-base">
                        {ConvertStatus(statusKey)}
                      </div>
                      <div
                        className={`stat-figure text-${ColorProductStatus(
                          ConvertStatus(statusKey)
                        )} text-3xl font-bold`}
                      >
                        {
                          productsData[productName].status[
                            statusKey as keyof (typeof productsData)[typeof productName]["status"]
                          ]
                        }
                      </div>
                    </div>
                  )
                )}
                <div className="flex flex-row justify-center items-center gap-5 p-5">
                  <h1 className="text-4xl text-center font-bold">
                    {productName}
                  </h1>
                  <div className="avatar">
                    <div className="w-24 rounded-xl">
                      <img
                        src={productsData[productName].image}
                        alt={productName}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
