import React from "react";
import { DateFromObjectId } from "@/components/dateTime";
import { ColorProductStatus } from "../../color";
import { ConvertStatus } from "@/components/convertStatusAndRole";
import Modal from "@/components/modal";
import SubmitPopupButton from "@/components/submitPopupButton";
import { MdDelete } from "react-icons/md";
import ModalMerchant from "../actions/handleUpdateMerchant";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { FaHistory } from "react-icons/fa";
import { ShowAlert } from "../../showAlert";
import { deleteMerchant } from "../actions/handleDeleteMerchant";
import { stringToHex } from "@/lib/generateRandomHref";

interface TableViewProps {
  item: any;
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  setUpdateAlert: any;
  setAlertTitle: any;
  setAlertStyles: any;
  setAlertIcon: any;
}

export const DesktopView = ({
  item,
  dataForCurrentPage,
  setUpdateAlert,
  setAlertTitle,
  setAlertStyles,
  setAlertIcon,
}: TableViewProps) => {
  const handleMerchantAdded = (productId: string, merchant: string) => {
    if (!productId || !merchant) {
      ShowAlert(
        "Failed to add merchant",
        "alert-error mobile:bg-error tablet:bg-error",
        setAlertTitle,
        setAlertStyles,
        setAlertIcon,
        setUpdateAlert
      );
      setUpdateAlert(true);
      return;
    }

    dataForCurrentPage.forEach((item) => {
      if (item.id === productId) {
        item.merchant = merchant;
      }
    });

    ShowAlert(
      "Merchant added successfully",
      "alert-success mobile:bg-success tablet:bg-success",
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
      setUpdateAlert
    );
    setUpdateAlert(true);
  };

  const handleDeleteMerchant = (id: string) => {
    deleteMerchant({
      productId: id,
      dataForCurrentPage,
      setUpdateAlert,
      setAlertTitle,
      setAlertStyles,
      setAlertIcon,
      ShowAlert,
    });
  };

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
          <div className="flex flex-row items-center justify-around">
            <div className="min-w-28 tooltip">
              {item.merchant.name.length > 10 ? (
                <Modal
                  title={
                    item.merchant.name.length > 10 &&
                    `${item.merchant.name.slice(0, 10)}...`
                  }
                  titleContent={item.merchant.name}
                  id={item.merchant.name}
                  boolClose={true}
                />
              ) : (
                <p>{item.merchant.name}</p>
              )}
            </div>
            <SubmitPopupButton
              action={() => handleDeleteMerchant(item.id)}
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
            onMerchantAdded={(merchant) =>
              handleMerchantAdded(item.id, merchant)
            }
          />
        )}
      </td>

      {/* Bank */}
      <td className={`py-2 px-4 h-[8vh] w-full`}>
        {item.bank ? (
          <span>{item.bank}</span>
        ) : (
          <button className="btn btn-xs text-xl btn-ghost">
            <IoMdAdd />
          </button>
        )}
      </td>

      {/* History */}
      <td className={`py-2 px-4 h-[8vh]`}>
        <Link
          href={`/products/history/${stringToHex(
            item.serialNumber
          )}?skip=0&take=7`}
        >
          <button className="btn btn-sm text-xl btn-ghost">
            <FaHistory />
          </button>
        </Link>
      </td>
    </tr>
  );
};
