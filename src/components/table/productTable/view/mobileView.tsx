import { DateFromObjectId } from "@/components/dateTime";
import Link from "next/link";
import { FaHistory } from "react-icons/fa";
import { ColorProductStatus } from "../../color";
import { ConvertStatus } from "@/components/convertStatusAndRole";
import { stringToHex } from "@/lib/generateRandomHref";
import { TableProductViewProps } from "../../compo/TableProps";
import { useState } from "react";
import MerChantInProduct from "../Merchant/MerchantInProduct";
import BankInProduct from "../Bank/BankProduct";

export const MobileView = ({
  item,
  dataBank,
  handleDeleteMerchant,
  handleAddMerchant,
  handleDeleteBank,
  handleAddBank,
}: TableProductViewProps) => {
  const [opemModalMerchant, setOpenModalMerchant] = useState(false);
  const [opemModalBank, setOpenModalBank] = useState(false);

  const [loadindDeleteMerchant, setLoadingDeleteMerchant] = useState(false);
  const [loadindDeleteBank, setLoadingDeleteBank] = useState(false);

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
                <MerChantInProduct
                  item={item}
                  handleDeleteMerchant={handleDeleteMerchant}
                  setLoadingDeleteMerchant={setLoadingDeleteMerchant}
                  loadindDeleteMerchant={loadindDeleteMerchant}
                  setOpenModalMerchant={setOpenModalMerchant}
                  opemModalMerchant={opemModalMerchant}
                  handleAddMerchant={handleAddMerchant}
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p>Bank</p>
              <div>
                <BankInProduct
                  item={item}
                  dataBank={dataBank}
                  handleDeleteBank={handleDeleteBank}
                  handleAddBank={handleAddBank}
                  setLoadingDeleteBank={setLoadingDeleteBank}
                  loadindDeleteBank={loadindDeleteBank}
                  setOpenModalBank={setOpenModalBank}
                  opemModalBank={opemModalBank}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
