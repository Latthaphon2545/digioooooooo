import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

import ModalMerchant from "./modalMerchant";
import AlertDialog, { Error, Success } from "@/components/alertDialog";

import { IoMdAdd } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SubmitPopupButton from "@/components/submitPopupButton";
import Modal from "@/components/modal";
import { showAlert } from "../showAlert";
import { DateFromObjectId } from "@/components/dateTime";
import { ConvertStatus } from "@/components/convertStatusAndRole";
import { ColorProductStatus } from "../color";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  editor?: boolean;
}

export default function Table({ dataForCurrentPage, editor }: TableProps) {
  const [updateAlert, setUpdateAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);

  const [isDeleting, setIsDeleting] = useState(false);

  const updateMerchant = (
    productId?: string,
    merchant?: any,
    success?: boolean
  ) => {
    if (!productId || !merchant)
      return showAlert(
        "Failed to add merchant",
        "alert-error mobile:bg-error tablet:bg-error",
        setAlertTitle,
        setAlertStyles,
        setAlertIcon,
        setUpdateAlert,
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
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
      setUpdateAlert,
      Success
    );
  };

  const deleteMerchant = async (productId: string) => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(`/api/products/deleteMerchant`, {
        data: { productId },
      });
      showAlert(
        "Merchant deleted successfully",
        "alert-success mobile:bg-success tablet:bg-success",
        setAlertTitle,
        setAlertStyles,
        setAlertIcon,
        setUpdateAlert
      );
    } catch (err) {
      console.log(err);
      showAlert(
        "Failed to delete merchant",
        "alert-error mobile:bg-error tablet:bg-error",
        setAlertTitle,
        setAlertStyles,
        setAlertIcon,
        setUpdateAlert,
        Error
      );
    } finally {
      setIsDeleting(false);
      dataForCurrentPage.map((item) => {
        if (item.id === productId) {
          item.merchant = null;
        }
      });
    }
  };

  const TableView = ({ item }: { item: any }) => {
    return (
      <tr key={item.serialNumber}>
        <td className={`py-2 px-4 h-[8vh]`}>
          <span className="w-full">{DateFromObjectId(item.id)}</span>
        </td>

        {/* Model */}
        <td className={`py-2 px-4 h-[8vh]`}>
          <span className="w-full">{item.model.series}</span>
        </td>

        {/* Serial Number */}
        <td className={`py-2 px-4 h-[8vh]`}>
          <p className="w-full">{item.serialNumber.slice(0, 6) + "XXXX"}</p>
        </td>

        {/* Status */}
        <td className={`py-2 px-4 h-[8vh]`}>
          <span
            className={`badge badge-${ColorProductStatus(
              ConvertStatus(item.status)
            )} badge-outline badge-md`}
          >
            {ConvertStatus(item.status)}
          </span>
        </td>

        {/* Merchant */}
        <td className="py-2 px-4 h-[8vh]">
          {item.merchant ? (
            <div className="flex flex-row items-center justify-evenly">
              <div className="min-w-28">
                {item.merchant.name.length > 10 ? (
                  <Modal
                    title={
                      item.merchant.name.length > 10 &&
                      `${item.merchant.name.slice(0, 10)}...`
                    }
                    titleContent="Merchant Name"
                    content={item.merchant.name}
                    id={item.merchant.name}
                  />
                ) : (
                  <p>{item.merchant.name}</p>
                )}
              </div>
              <SubmitPopupButton
                action={() => deleteMerchant(item.id)}
                styles="btn-error btn-ghost btn-xs text-xl text-error"
                header="Delete Merchant"
                description="Are you sure you want to delete this merchant?"
                id={`delete-merchant-${item.id}`}
                confirmString="Delete"
                confirmStyle="btn-error"
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
            <span>{item.bank}</span>
          ) : (
            <button className="btn text-xl btn-ghost">
              <IoMdAdd />
            </button>
          )}
        </td>

        {/* History */}
        <td className={`py-2 px-4 h-[8vh]`}>
          <Link
            href={`/products/history/${item.serialNumber}?filter=&search=&skip=0&take=7`}
          >
            <button className="btn text-xl btn-ghost">
              <FaHistory />
            </button>
          </Link>
        </td>
      </tr>
    );
  };

  const mobileView = ({ item }: { item: any }) => {
    return (
      <div className="card w-[90vw] bg-base-100 shadow-xl">
        <div className="card-body p-5">
          <div className="card-title flex-col">
            <div className="flex w-full justify-between items-center">
              <h1 className=" text-gray-500 text-sm">
                {DateFromObjectId(item.id)}
              </h1>
              <Link
                href={`/products/history/${item.serialNumber}?filter=&search=&skip=0&take=7`}
              >
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
                className={`badge badge-${ColorProductStatus(
                  ConvertStatus(item.status)
                )} badge-outline badge-md`}
              >
                {ConvertStatus(item.status)}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-2">
              <div className="flex justify-between items-center">
                <p>Merchant</p>
                <div>
                  {item.merchant ? (
                    <div className="flex flex-row items-center justify-between gap-3">
                      <div>
                        {item.merchant.name.length > 10 ? (
                          <Modal
                            title={
                              item.merchant.name.length > 10 &&
                              `${item.merchant.name.slice(0, 10)}...`
                            }
                            titleContent="Merchant Name"
                            content={item.merchant.name}
                            id={item.merchant.name}
                          />
                        ) : (
                          <p>{item.merchant.name}</p>
                        )}
                      </div>
                      <div>
                        <SubmitPopupButton
                          action={() => deleteMerchant(item.id)}
                          styles="btn-error btn-sm"
                          header="Delete Merchant"
                          description="Are you sure you want to delete this merchant?"
                          id={`delete-merchant-${item.id}`}
                          confirmString="Delete"
                          confirmStyle="btn-error"
                        >
                          <MdDelete />
                        </SubmitPopupButton>
                      </div>
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
                <p>Bank</p>
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
              <TableView key={item.serialNumber} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile:block tablet:hidden laptop:hidden pb-5">
        {dataForCurrentPage.map((item) => (
          <div key={item.serialNumber} className="mt-3">
            {mobileView({ item })}
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
