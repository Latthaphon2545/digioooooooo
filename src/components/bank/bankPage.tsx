"use client";

import { IoMdAddCircle } from "react-icons/io";
import { LaptopUI, MobileUI } from "./sliceBank";
import Link from "next/link";
import { use, useEffect, useState } from "react";

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
  const [bankName, setBankName] = useState("");
  const [bankSelected, setBankSelected] = useState<Record<string, Product>>({});

  const setBank = (name: string, product: Record<string, Product>) => {
    setBankName(name);
    setBankSelected(product);
  };

  useEffect(() => {
    // Set the first bank as default
    setBank(banks[0].name, banks[0].product);
  }, []);

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
                <MobileUI productsData={item.product} bankName={item.name} />
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="laptop:flex tablet:hidden mobile:hidden py-5 h-full flex-col justify-center items-center ">
        <div className="join join-horizontal gap-5 overflow-x-auto w-[90%]">
          {banks.map((item, index) => (
            <div
              key={index}
              className={`btn w-56 h-32 flex flex-col ${
                bankName === item.name ? "btn-primary bg-opacity-100" : ""
              }`}
              onClick={() => setBank(item.name, item.product)}
            >
              <img src={item.image} alt={item.name} width={80} />
              <p>{item.name}</p>
            </div>
          ))}
          <Link
            href="/banks/add"
            className="btn w-56 h-32 flex flex-col "
            key="Add"
          >
            <p className="text-4xl">
              <IoMdAddCircle />
            </p>
            <p className="text-2xl">Add Bank</p>
          </Link>
        </div>

        <LaptopUI productsData={bankSelected} bankName={bankName} />
      </div>
    </>
  );
}
