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

  // useEffect(() => {
  //   const autoMove = setInterval(() => {
  //     setCurrentBank((prev) => (prev + 1) % banks.length);
  //   }, 5000);

  //   return () => clearInterval(autoMove);
  // }, [banks.length]);

  // useEffect(() => {
  //   const nextBankId = `bank${currentBank + 1}`;
  //   const nextBankElement = document.getElementById(nextBankId);
  //   if (nextBankElement) {
  //     nextBankElement.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   }
  // }, [currentBank]);

  const handleSlideChange = (index: number) => {
    setCurrentBank(index);
  };

  return (
    <div className="bg-gray-200 py-5 flex flex-col justify-center laptop:rounded-tl-[1rem] laptop:min-w-full mobile:max-w-sm tablet:min-w-full">
      <div className="carousel rounded-box">
        {banks.map((bank, index) => (
          <React.Fragment key={bank.name}>
            <div
              id={`bank${index + 1}`}
              className={`carousel-item relative w-full flex justify-center items-center gap-5 flex-row`}
              onMouseOver={() => handleSlideChange(index)}
              onMouseMove={() => handleSlideChange(index)}
              onTouchStart={() => handleSlideChange(index)}
              onTouchMove={() => handleSlideChange(index)}
              onTouchStartCapture={() => handleSlideChange(index)}
            >
              <img
                src={bank.image}
                alt={bank.name}
                className="rounded-lg laptop:w-52 laptop:h-52 mobile:hidden tablet:block tablet:w-48 tablet:h-48 laptop:block"
              />
              <div className="mb-5">
                {StatStatus({ status: bank.status, image: bank.image })}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <SlidePagination
        totalBank={banks.length}
        currentBank={currentBank}
        setCurrentBank={setCurrentBank}
      />
    </div>
  );
}

const StatStatus = ({
  status,
  image,
}: {
  status: Record<string, number>;
  image: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="stats stats-horizontal grid gap-3 shadow-lg mobile:grid-rows-4 tablet:grid-rows-2 laptop:grid-rows-2">
        {Object.entries(status).map(([status, value], index) => (
          <div key={index} className="stat">
            <div className="stat-title laptop:text-sm mobile:text-xs">
              {status}
            </div>
            <div
              className={`stat-value laptop:text-2xl mobile:text-base tablet:text-2xl`}
            >
              {value}
            </div>
          </div>
        ))}
        <img
          src={image}
          className="w-16 h-16 rounded-full absolute bottom-8 tablet:hidden mobile:right-20 laptop:hidden 
        "
          alt={image}
        />
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
    <div className="flex justify-center items-center gap-4 mt-4">
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
