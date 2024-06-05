import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Bank {
  name: string;
  status: Record<string, number>;
  image: string;
}

interface BankProps {
  banks: Bank[];
}

export default function BankPage({ banks }: BankProps) {
  const [currentBank, setCurrentBank] = useState(0);

  useEffect(() => {
    const autoMove = setInterval(() => {
      setCurrentBank((prev) => (prev + 1) % banks.length);
      // move to next bank use id
      const nextBankId = `bank${((currentBank + 1) % banks.length) + 1}`;
      const nextBankElement = document.getElementById(nextBankId);
      if (nextBankElement) {
        nextBankElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 5000);
    return () => clearInterval(autoMove);
  }, [banks.length, currentBank]);

  return (
    <div>
      <div className="carousel rounded-box">
        {banks.map((bank, index) => {
          return (
            <React.Fragment key={bank.name}>
              <div
                id={`bank${index + 1}`}
                className={`carousel-item relative w-full justify-center items-center`}
                onMouseOver={() => setCurrentBank(index)}
              >
                <img
                  src={bank.image}
                  alt={bank.name}
                  className="w-[17vw] h-[30vh] mx-10 "
                />
                <div className="flex flex-col items-center justify-center gap-5 ">
                  {StatStatus(bank.status)}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <SlidePagination
        totalBank={banks.length}
        currentBank={currentBank}
        setCurrentBank={setCurrentBank}
      />
    </div>
  );
}

const StatStatus = (status: Record<string, number>) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="stats stats-horizontal grid grid-rows-2 gap-4 shadow-xl">
        {Object.entries(status).map(([status, value], index) => (
          <div key={index} className="stat">
            <div className="stat-title text-sm">{status}</div>
            <div className={`stat-value text-2xl`}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SlidePaginationProps {
  totalBank: number;
  currentBank: number;
  setCurrentBank: (index: number) => void;
}

const SlidePagination = ({
  totalBank,
  currentBank,
  setCurrentBank,
}: SlidePaginationProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center gap-4">
      {Array.from({ length: totalBank }).map((_, index) => {
        const isActive = currentBank === index;
        return (
          <div
            key={index}
            className={`h-3 rounded-full cursor-pointer ${
              isActive ? "bg-primary w-7" : "bg-base-content w-3"
            }`}
            onClick={() => {
              router.push(`#bank${index + 1}`);
              setCurrentBank(index);
            }}
          ></div>
        );
      })}
    </div>
  );
};
