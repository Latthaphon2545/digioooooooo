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
      <div className="w-full laptop:hidden">
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

      <div className=" laptop:block tablet:hidden px-10 py-5 h-full max-w-[83vw]">
        <div className="flex flex-rol gap-5 pb-14 px-5  overflow-x-scroll scroll-smooth">
          {banks.map((item) => (
            <div
              className="card bg-base-100 shadow-xl min-w-[25vw]"
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
        <p className="text-center">Move left or right to see more banks</p>
      </div>
    </>
  );
}
