import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

import ModalMerchant from "./modalMerchant";
import AlertDialog, { Error, Success } from "@/components/alertDialog";

import { IoMdAdd } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
      return showAlert("Failed to add merchant", "alert-error", Error);
    dataForCurrentPage.map((item) => {
      if (item.id === productId) {
        item.merchant = merchant;
      }
    });
    showAlert("Merchant added successfully", "alert-success", Success);
  };

  const deleteMerchant = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this merchant?")) return;
    try {
      const response = await axios.delete(`/api/products/deleteMerchant`, {
        data: { productId },
      });
      showAlert("Merchant deleted successfully", "alert-success", Success);
    } catch (err) {
      console.log(err);
      showAlert("Failed to delete merchant", "alert-error", Error);
    } finally {
      dataForCurrentPage.map((item) => {
        if (item.id === productId) {
          item.merchant = null;
        }
      });
    }
  };

  const TableRow = ({ item }: { item: any }) => {
    return (
      <tr key={item.serialNumber}>
        {/* Model */}
        <td className={`py-2 px-4 h-[8vh]`}>
          <p className="w-full">{item.model.series}</p>
        </td>

        {/* Serial Number */}
        <td className={`py-2 px-4 h-[8vh]`}>
          <p className="w-full">{item.serialNumber}</p>
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
            <div className="flex flex-row items-center justify-center">
              <p>{item.merchant.name}</p>
              <button
                onClick={() => deleteMerchant(item.id)}
                className="btn btn-error btn-ghost btn-sm text-xl text-error"
              >
                <MdDelete />
              </button>
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

  return (
    <>
      <div className="min-h-[63vh] mt-3 w-[80vw]">
        <table className="table table-fixed w-full text-center">
          <thead>
            <tr>
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
              <TableRow key={item.serialNumber} item={item} />
            ))}
          </tbody>
        </table>
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
