import { IoMdAddCircle } from "react-icons/io";
import Slice from "./sliceBank";

interface Bank {
  name: string;
  bankName: string;
  bankLogo: string;
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
  bg: string;
}

interface BankPageProps {
  banks: Bank[];
  products: Product[];
}

export default function BankPage({ banks, products }: BankPageProps) {
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
                <h2 className="card-title">{item.bankName}</h2>
                <img src={item.bankLogo} alt={item.bankName} width={80} />
              </div>
              <figure>
                <Slice products={products} />
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
                <h2 className="card-title">{item.bankName}</h2>
                <img src={item.bankLogo} alt={item.bankName} width={80} />
              </div>
              <figure>
                <Slice products={products} />
              </figure>
            </div>
          ))}
          <div
            className="card bg-base-200 bg-opacity-40 shadow-xl laptop:w-80 desktop:w-96 flex flex-col justify-center items-center gap-5"
            key="Add"
          >
            <p className="text-4xl">
              <IoMdAddCircle />
            </p>
            <p className="text-2xl">Add Bank</p>
          </div>
        </div>
      </div>
    </>
  );
}
