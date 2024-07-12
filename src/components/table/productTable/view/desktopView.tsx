import React, { useState } from "react";
import { DateFromObjectId } from "@/components/dateTime";
import { ColorProductStatus } from "../../color";
import { ConvertStatus } from "@/components/convertStatusAndRole";
import Link from "next/link";
import { FaHistory } from "react-icons/fa";
import { stringToHex } from "@/lib/generateRandomHref";
import { TableProductViewProps } from "../../compo/TableProps";
import MerChantInProduct from "../Merchant/MerchantInProduct";
import BankInProduct from "../Bank/BankProduct";

export const DesktopView = ({
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
        <MerChantInProduct
          item={item}
          handleDeleteMerchant={handleDeleteMerchant}
          setLoadingDeleteMerchant={setLoadingDeleteMerchant}
          loadindDeleteMerchant={loadindDeleteMerchant}
          setOpenModalMerchant={setOpenModalMerchant}
          opemModalMerchant={opemModalMerchant}
          handleAddMerchant={handleAddMerchant}
        />
      </td>

      {/* Bank */}
      <td className={`py-2 px-4 h-[8vh] w-full`}>
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
