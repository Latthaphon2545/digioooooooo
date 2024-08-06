import React, { useState } from "react";

import AlertDialog from "@/components/alertDialog";
import { DesktopView } from "./view/desktopView";
import { MobileView } from "./view/mobileView";
import { TableProductBodyProps } from "../compo/TableProps";
import { handleAddMerchantToProduct } from "@/lib/actions/productTable/UpdateMerchant/action";
import { deleteMerchant } from "@/lib/actions/productTable/DeleteMerchant/action";
import { deleteBank } from "@/lib/actions/productTable/DeleteBank/action";
import { handleAddBankToProduct } from "@/lib/actions/productTable/AddBank/action";

export default function Table({
  dataForCurrentPage,
  bankData,
}: TableProductBodyProps) {
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);

  const handleAddMerchantWrapper = async ({
    productId,
    merchantId,
    setLoadingAdd,
  }: {
    productId: string;
    merchantId: string;
    setLoadingAdd: (value: boolean) => void;
  }) => {
    handleAddMerchantToProduct({
      dataForCurrentPage,
      productID: productId,
      merchantID: merchantId,
      setLoadingAdd,
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
    });
  };

  const handleDeleteMerchantWrapper = ({
    id,
    setLoadingDelete,
  }: {
    id: string;
    setLoadingDelete: (value: boolean) => void;
  }) => {
    deleteMerchant({
      productId: id,
      dataForCurrentPage,
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
      setLoadingDelete,
    });
  };

  const handleDeleteBankWrapper = ({
    id,
    setLoadingDelete,
  }: {
    id: string;
    setLoadingDelete: (value: boolean) => void;
  }) => {
    deleteBank({
      productId: id,
      dataForCurrentPage,
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
      setLoadingDelete,
    });
  };

  const handleAddBankWrapper = ({
    productId,
    bankId,
    setLoadingAdd,
  }: {
    productId: string;
    bankId: string;
    setLoadingAdd: (value: boolean) => void;
  }) => {
    handleAddBankToProduct({
      productId,
      bankId,
      setLoading: setLoadingAdd,
      dataForCurrentPage,
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
    });
  };

  return (
    <>
      <div className="min-h-[63vh] mt-3 w-[80vw] mobile:hidden tablet:hidden laptop:block">
        <table className="table table-fixed w-full text-center">
          <thead>
            <tr>
              <th></th>
              <th>Model</th>
              <th>Serial Number</th>
              <th>Status</th>
              <th>Merchant</th>
              <th>Bank</th>
              <th>History</th>
            </tr>
          </thead>
          <tbody>
            {dataForCurrentPage.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-2 px-4 h-[8vh]">
                  No data available
                </td>
              </tr>
            )}
            {dataForCurrentPage.map((item) => (
              <DesktopView
                key={item.serialNumber}
                item={item}
                dataBank={bankData}
                handleDeleteMerchant={handleDeleteMerchantWrapper}
                handleAddMerchant={handleAddMerchantWrapper}
                handleDeleteBank={handleDeleteBankWrapper}
                handleAddBank={handleAddBankWrapper}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile:block tablet:block laptop:hidden pb-5">
        {dataForCurrentPage.map((item) => (
          <div key={item.serialNumber} className="mt-3">
            <MobileView
              key={item.serialNumber}
              item={item}
              dataBank={bankData}
              handleDeleteMerchant={handleDeleteMerchantWrapper}
              handleAddMerchant={handleAddMerchantWrapper}
              handleDeleteBank={handleDeleteBankWrapper}
              handleAddBank={handleAddBankWrapper}
            />
          </div>
        ))}
      </div>

      <AlertDialog
        alertTitle={alertTitle}
        styles={alertStyles}
        icon={alertIcon}
        id="userUpdate"
        setAlertTitle={setAlertTitle}
      />
    </>
  );
}
