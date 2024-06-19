import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

import ModalMerchant from "./modalMerchant";
import AlertDialog, { Error, Success } from "@/components/alertDialog";

import { IoMdAdd } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SubmitPopupButton from "@/components/submitPopupButton";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  colorProductStatus: (status: string) => string;
  editor?: boolean;
}

export default function Table({
  dataForCurrentPage,
  colorProductStatus,
  editor,
}: TableProps) {
  const [updateAlert, setUpdateAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);

  const showAlert = (title: string, styles: string, icon?: React.ReactNode) => {
    setAlertTitle(title);
    setAlertStyles(styles);
    setAlertIcon(icon);
    setUpdateAlert(true);
    setTimeout(() => setUpdateAlert(false), 3000);
  };

  const updateMerchant = (
    productId?: string,
    merchant?: any,
    success?: boolean
  ) => {
    if (!productId || !merchant)
      return showAlert(
        "Failed to add merchant",
        "alert-error mobile:bg-error",
        Error
      );
    dataForCurrentPage.map((item) => {
      if (item.id === productId) {
        item.merchant = merchant;
      }
    });
    showAlert(
      "Merchant added successfully",
      "alert-success mobile:bg-success tablet:bg-success",
      Success
    );
  };

  const deleteMerchant = async (productId: string) => {
    try {
      const response = await axios.delete(`/api/products/deleteMerchant`, {
        data: { productId },
      });
      showAlert(
        "Merchant deleted successfully",
        "alert-success mobile:bg-success tablet:bg-success",
        Success
      );
    } catch (err) {
      console.log(err);
      showAlert(
        "Failed to delete merchant",
        "alert-error mobile:bg-error tablet:bg-error",
        Error
      );
    } finally {
      dataForCurrentPage.map((item) => {
        if (item.id === productId) {
          item.merchant = null;
        }
      });
    }
  };

  const dateFromObjectId = function (objectId: string) {
    const timestamp = parseInt(objectId.substring(0, 8), 16) * 1000;
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const TableRow = ({ item }: { item: any }) => {
    return (
      <tr key={item.serialNumber}>
        <td className={`py-2 px-4 h-[8vh]`}>
          <p className="w-full">{dateFromObjectId(item.id).toString()}</p>
        </td>

        {/* Model */}
        <td className={`py-2 px-4 h-[8vh]`}>
          <p className="w-full">{item.model.series}</p>
        </td>

        {/* Status */}
        <td className={`py-2 px-4 h-[8vh]`}>
          <div
            className={`badge badge-${colorProductStatus(
              convertStatus(item.status)
            )} badge-outline badge-md`}
          >
            <p>{convertStatus(item.status)}</p>
          </div>
        </td>

        {/* Merchant */}
        <td className="py-2 px-4 h-[8vh]">
          {item.merchant ? (
            <div className="flex flex-row items-center justify-evenly">
              <p>{item.merchant.name}</p>
              <SubmitPopupButton
                action={() => deleteMerchant(item.id)}
                styles="btn-error btn-ghost btn-xs text-xl text-error"
                header="Delete Merchant"
                description="Are you sure you want to delete this merchant?"
                id="delete-merchant"
                isSubmitting={false}
              >
                <MdDelete />
              </SubmitPopupButton>
            </div>
          ) : (
            <ModalMerchant
              productId={item.id}
              onMerchantAdded={(merchant) => updateMerchant(item.id, merchant)}
            />
          )}
        </td>

        {/* Bank */}
        <td className={`py-2 px-4 h-[8vh] w-full`}>
          {item.bank ? (
            <p>{item.bank}</p>
          ) : (
            <button className="btn text-xl btn-ghost">
              <IoMdAdd />
            </button>
          )}
        </td>

        {/* History */}
        <td className={`py-2 px-4 h-[8vh]`}>
          <Link href={`products/history/${item.serialNumber}`}>
            <button className="btn text-xl btn-ghost">
              <FaHistory />
            </button>
          </Link>
        </td>
      </tr>
    );
  };

  const mobileData = ({ item }: { item: any }) => {
    return (
      <div className="card w-[90vw] bg-base-100 shadow-xl">
        <div className="card-body p-5">
          <div className="card-title flex-col">
            <div className="flex w-full justify-between items-center">
              <h1 className=" text-gray-500 text-sm">
                {dateFromObjectId(item.id).toString()}
              </h1>
              <Link href={`products/history/${item.serialNumber}`}>
                <button className="btn btn-sm text-xl btn-ghost">
                  <FaHistory />
                </button>
              </Link>
            </div>
            <div className="divider my-0"></div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-base font-bold">{item.model.series}</p>
              </div>
              <div
                className={`badge badge-${colorProductStatus(
                  convertStatus(item.status)
                )} badge-outline badge-md`}
              >
                {convertStatus(item.status)}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <p>Merchant</p>
                </div>
                <div>
                  {item.merchant ? (
                    <div className="flex flex-row items-center justify-between">
                      <div>{item.merchant.name}</div>
                      <SubmitPopupButton
                        action={() => deleteMerchant(item.id)}
                        styles="btn-error"
                        header="Delete Merchant"
                        description="Are you sure you want to delete this merchant?"
                        id="delete-merchant"
                        isSubmitting={false}
                      >
                        <MdDelete />
                      </SubmitPopupButton>
                    </div>
                  ) : (
                    <ModalMerchant
                      productId={item.id}
                      onMerchantAdded={(merchant) =>
                        updateMerchant(item.id, merchant)
                      }
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p>Bank</p>
                </div>
                <div>
                  {item.bank ? (
                    <p>{item.bank}</p>
                  ) : (
                    <button className="btn btn-xs text-xl btn-ghost py-2">
                      <IoMdAdd />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-[63vh] mt-3 w-[80vw] mobile:hidden tablet:block laptop:block">
        <table className="table table-fixed w-full text-center">
          <thead>
            <tr>
              <th></th>
              <th>Model</th>
              {/* <th>Serial Number</th> */}
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
              <TableRow key={item.serialNumber} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile:block tablet:hidden laptop:hidden pb-5">
        {dataForCurrentPage.map((item) => (
          <div key={item.serialNumber} className="mt-3">
            {mobileData({ item })}
          </div>
        ))}
      </div>

      <div className="fixed bottom-4 left-[15%] w-[20%]">
        {updateAlert && (
          <AlertDialog
            title={alertTitle}
            styles={alertStyles}
            icon={alertIcon}
          />
        )}
      </div>
    </>
  );
}

export const convertStatus = (status: string) => {
  let showStatus = "";
  if (typeof status !== "string") {
    return showStatus;
  }
  status = status.toUpperCase().trim();
  if (status === "INSTOCK") {
    showStatus = "In Stock";
  } else if (status === "LOST") {
    showStatus = "Lost";
  } else if (status === "DAMAGED") {
    showStatus = "Damaged";
  } else if (status === "REPARING") {
    showStatus = "Reparing";
  } else if (status === "WAITREPAIR") {
    showStatus = "Waiting For Repair";
  } else if (status === "INSTALLED") {
    showStatus = "Installed";
  } else if (status === "INSTALLING") {
    showStatus = "Installing";
  }
  return showStatus;
};
