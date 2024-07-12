import Modal from "@/components/modal";
import SubmitPopupButton from "@/components/submitPopupButton";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import ModalBankAdd from "./ModalBankAdd";

interface BankProductProps {
  item: any;
  dataBank: any;
  handleDeleteBank: any;
  handleAddBank: any;
  setLoadingDeleteBank: (value: boolean) => void;
  loadindDeleteBank: boolean;
  setOpenModalBank: (value: boolean) => void;
  opemModalBank: boolean;
}

export default function BankInProduct({
  item,
  dataBank,
  handleDeleteBank,
  handleAddBank,
  setLoadingDeleteBank,
  loadindDeleteBank,
  setOpenModalBank,
  opemModalBank,
}: BankProductProps) {
  return (
    <>
      {item.bankId ? (
        <div className="flex flex-row items-center justify-around">
          <div className="min-w-20 ">{item.bank.bankAbbreviations}</div>
          <SubmitPopupButton
            action={() => {
              handleDeleteBank({
                id: item.id,
                setLoadingDelete: setLoadingDeleteBank,
              });
            }}
            styles="btn-error btn-ghost btn-xs text-xl text-error"
            header="Delete Merchant"
            description="Are you sure you want to delete this merchant?"
            id={`delete-merchant-${item.id}`}
            confirmString="Delete"
            confirmStyle="btn-error"
          >
            {loadindDeleteBank ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <MdDelete />
            )}
          </SubmitPopupButton>
        </div>
      ) : (
        <Modal
          id={`modal-bank-${item.id}`}
          NameBtn={<IoMdAdd />}
          styleBtn="text-xl btn-ghost"
          content={
            <ModalBankAdd
              productId={item.id}
              banks={dataBank}
              handleAddBank={handleAddBank}
            />
          }
          action={() => {
            setOpenModalBank(!opemModalBank);
          }}
          open={opemModalBank}
          setOpen={setOpenModalBank}
        />
      )}
    </>
  );
}
