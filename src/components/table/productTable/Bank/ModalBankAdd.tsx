import SubmitPopupButton from "@/components/submitPopupButton";
import React, { useState } from "react";

interface ModalBankAddProps {
  productId: string;
  banks: any[];
  handleAddBank: ({
    productId,
    bankId,
    setLoadingAdd,
  }: {
    productId: string;
    bankId: string;
    setLoadingAdd: (value: boolean) => void;
  }) => void;
}

export default function ModalBankAdd({
  productId,
  banks,
  handleAddBank,
}: ModalBankAddProps) {
  const [bankId, setBankId] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="grid grid-cols-2 gap-2 justify-items-center w-full">
          {banks.map((bank, index) => {
            const isSelected = bankId === bank.id;
            return (
              <div
                key={index}
                className={`flex flex-col p-2 w-full  btn btn-outline btn-base-100 h-32 ${
                  isSelected ? "btn-primary border-2" : ""
                } hover:btn-primary`}
                onClick={() => {
                  setBankId(bank.id === bankId ? "" : bank.id);
                }}
              >
                <img
                  src={bank.image}
                  alt={bank.image}
                  className="w-14 h-14 rounded-lg"
                />
                <h2 className="text-center p-2 mobile:hidden tablet:block">
                  {bank.name}
                </h2>
                <h2 className="text-center p-2 tablet:hidden mobile:block">
                  {bank.bankAbbreviations}
                </h2>
              </div>
            );
          })}
        </div>

        <SubmitPopupButton
          action={() =>
            handleAddBank({ productId, bankId, setLoadingAdd: setLoading })
          }
          styles={`${bankId ? "btn-primary" : "btn-disabled"} btn`}
          header="Clear Selection"
          description="Are you sure you want to clear the selection?"
          id={`modal-bank-${productId}`}
          confirmString="Confirm"
          confirmStyle="btn-success"
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Add Bank"
          )}
        </SubmitPopupButton>
      </div>
    </>
  );
}
