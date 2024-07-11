import React, { useState } from "react";
import { StatStatus } from "./StatStatusBank";
import { SlidePagination } from "./SlidePagination";

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

  const handleSlideChange = (index: number) => {
    setCurrentBank(index);
  };

  return (
    <div className=" py-5 flex flex-col justify-center laptop:min-w-full mobile:max-w-sm tablet:min-w-full">
      <div className="carousel rounded-box">
        {banks.map((bank, index) => (
          <React.Fragment key={bank.name}>
            <div
              id={`bank${index + 1}`}
              className={`carousel-item relative w-full justify-center items-center`}
              onMouseOver={() => handleSlideChange(index)}
              onMouseMove={() => handleSlideChange(index)}
              onTouchStart={() => handleSlideChange(index)}
              onTouchMove={() => handleSlideChange(index)}
              onTouchStartCapture={() => handleSlideChange(index)}
            >
              <img
                src={bank.image}
                alt={bank.name}
                className="mx-10 rounded-lg laptop:w-52 laptop:h-52 mobile:hidden tablet:block tablet:w-48 tablet:h-48 laptop:block"
              />
              <div className="mb-5">
                <StatStatus status={bank.status} image={bank.image} />
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
