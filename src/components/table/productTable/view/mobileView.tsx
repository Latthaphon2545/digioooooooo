import { DateFromObjectId } from "@/components/dateTime";
import Link from "next/link";
import { FaHistory } from "react-icons/fa";
import { ColorProductStatus } from "../../color";
import { ConvertStatus } from "@/components/convertStatusAndRole";
import SubmitPopupButton from "@/components/submitPopupButton";
import { MdDelete } from "react-icons/md";
import ModalMerchant from "../actions/handleUpdateMerchant";
import { IoMdAdd } from "react-icons/io";
import { ShowAlert } from "../../showAlert";
import { deleteMerchant } from "../actions/handleDeleteMerchant";
import Modal from "@/components/modal";
import { stringToHex } from "@/lib/generateRandomHref";

interface MobileViewProps {
  item: any;
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  setUpdateAlert: any;
  setAlertTitle: any;
  setAlertStyles: any;
  setAlertIcon: any;
}

export const MobileView = ({
  item,
  dataForCurrentPage,
  setUpdateAlert,
  setAlertTitle,
  setAlertStyles,
  setAlertIcon,
}: MobileViewProps) => {
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
    <div className="card w-[90vw] bg-base-100 shadow-xl">
      <div className="card-body p-5">
        <div className="card-title flex-col">
          <div className="flex w-full justify-between items-center">
            <h1 className=" text-gray-500 text-sm">
              {DateFromObjectId(item.id)}
            </h1>
            <Link
              href={`/products/history/${stringToHex(
                item.serialNumber
              )}?filter=&search=&skip=0&take=7`}
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
                          titleContent={item.merchant.name}
                          id={item.merchant.name}
                          boolClose={true}
                        />
                      ) : (
                        <p>{item.merchant.name}</p>
                      )}
                    </div>
                    <div>
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
                  </div>
                ) : (
                  <ModalMerchant
                    productId={item.id}
                    onMerchantAdded={(merchant) =>
                      handleMerchantAdded(item.id, merchant)
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