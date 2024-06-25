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
    <div className="flex flex-row gap-5 m-10 overflow-x-auto overflow-y-hidden">
      {banks.map((item) => (
        <div
          className="card tablet:w-[40%] mobile:w-[70vw] h-[75vh] bg-base-100 shadow-xl"
          key={item.name}
        >
          <div className="card-body flex flex-row justify-between items-center">
            <h2 className="card-title">{item.bankName}</h2>
            {/* <p>Bank Name: {item.bankName}</p> */}
            <img
              src={item.bankLogo}
              alt=""
              width={80}
              className="mobile:hidden tablet:block laptop:block"
            />
          </div>
          <figure>
            <Slice products={products} />
          </figure>
        </div>
      ))}
      <div className="skeleton w-96 opacity-15 h-[81vh]"></div>
    </div>
  );
}
