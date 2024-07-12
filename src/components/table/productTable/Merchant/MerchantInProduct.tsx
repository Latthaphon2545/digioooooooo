import Modal from "@/components/modal";
import SubmitPopupButton from "@/components/submitPopupButton";
import React from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { ModalMerchantAdd } from "./ModalMerchantAdd";

interface MerChantInProductProps {
  item: any;
  handleDeleteMerchant: ({
    id,
    setLoadingDelete,
  }: {
    id: string;
    setLoadingDelete: (value: boolean) => void;
  }) => void;
  setLoadingDeleteMerchant: (value: boolean) => void;
  loadindDeleteMerchant: boolean;
  setOpenModalMerchant: (value: boolean) => void;
  opemModalMerchant: boolean;
  handleAddMerchant: ({
    productId,
    merchantId,
    setLoadingAdd,
  }: {
    productId: string;
    merchantId: string;
    setLoadingAdd: (value: boolean) => void;
  }) => void;
}

export default function MerChantInProduct({
  item,
  handleDeleteMerchant,
  setLoadingDeleteMerchant,
  loadindDeleteMerchant,
  setOpenModalMerchant,
  opemModalMerchant,
  handleAddMerchant,
}: MerChantInProductProps) {
  return (
    <>
      {item.merchant ? (
        <div className="flex flex-row items-center justify-around">
          <div className="min-w-20 tooltip">
            <p>{item.merchant.name.slice(0, 10)}...</p>
          </div>
          <SubmitPopupButton
            action={() => {
              handleDeleteMerchant({
                id: item.id,
                setLoadingDelete: setLoadingDeleteMerchant,
              });
            }}
            styles="btn-error btn-ghost btn-xs text-xl text-error"
            header="Delete Merchant"
            description="Are you sure you want to delete this merchant?"
            id={`delete-merchant-${item.id}`}
            confirmString="Delete"
            confirmStyle="btn-error"
          >
            {loadindDeleteMerchant ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <MdDelete />
            )}
          </SubmitPopupButton>
        </div>
      ) : (
        <Modal
          id={`modal-merchant-${item.id}`}
          NameBtn={<IoMdAdd />}
          styleBtn=" text-xl btn-ghost"
          content={
            <ModalMerchantAdd
              productId={item.id}
              handleAddMerchant={handleAddMerchant}
            />
          }
          action={() => {
            setOpenModalMerchant(!opemModalMerchant);
          }}
          open={opemModalMerchant}
          setOpen={setOpenModalMerchant}
        />
      )}
    </>
  );
}
