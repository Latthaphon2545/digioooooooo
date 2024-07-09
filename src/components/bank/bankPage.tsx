import { IoMdAddCircle } from "react-icons/io";
import Slice from "./sliceBank";
import Link from "next/link";

interface Bank {
  name: string;
  image: string;
  product: Record<string, Product>;
}

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
  image: string;
}

interface BankPageProps {
  banks: Bank[];
}

export default function BankPage({ banks }: BankPageProps) {
  return (
    <>
      <div className="w-full tablet:block mobile:block laptop:hidden">
        <div className="flex justify-center gap-5 mx-10 my-5 mobile:flex-wrap tablet:flex-wrap ">
          {banks.map((item) => (
            <div
              className="card tablet:w-[40%] mobile:w-[70vw]  bg-base-100 shadow-xl"
              key={item.name}
            >
              <div className="card-body flex flex-row justify-between items-center">
                <h2 className="card-title">{item.name}</h2>
                <img src={item.image} alt={item.name} width={80} />
              </div>
              <figure>
                <Slice productsData={item.product} bankName={item.name} />
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="laptop:block tablet:hidden mobile:hidden px-10 py-5 h-full">
        <div className="grid grid-cols-3 gap-5 justify-items-center">
          {banks.map((item, index) => (
            <div
              className="card bg-base-100 shadow-xl laptop:w-80 desktop:w-96"
              key={index}
            >
              <div className="card-body flex flex-row justify-between items-center">
                <h2 className="card-title">{item.name}</h2>
                <img src={item.image} alt={item.name} width={80} />
              </div>
              <figure>
                <Slice productsData={item.product} bankName={item.name} />
              </figure>
            </div>
          ))}
          <Link
            href="/banks/add"
            className="card bg-base-200 bg-opacity-40 shadow-xl laptop:w-80 desktop:w-96 flex flex-col justify-center items-center gap-5  hover:bg-opacity-80
            "
            key="Add"
          >
            <p className="text-4xl">
              <IoMdAddCircle />
            </p>
            <p className="text-2xl">Add Bank</p>
          </Link>
        </div>
      </div>
    </>
  );
}
