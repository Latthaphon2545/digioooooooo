import React from "react";
import ViewImg from "../historyProduct/historyProductViewImg";
import { ConvertTime } from "@/components/dateTime";
import { ConvertStatus } from "@/components/convertStatusAndRole";
import Link from "next/link";
import { ColorProductStatus } from "../color";
import Modal from "@/components/modal";
import ActionButton from "@/components/actionButton";
import { TbUserEdit } from "react-icons/tb";
import { stringToHex } from "@/lib/generateRandomHref";

type TableUserHistoryProps = {
  history: any[];
  isEditor: boolean;
};

const TableRow = ({ item }: { item: any }) => {
  const { formattedDate, displayTime } = ConvertTime(item.createdAt);
  return (
    <tr key={item.id}>
      <td>
        <h2 className="text-sm">{formattedDate}</h2>
        <h3 className="text-sm">{displayTime}</h3>
      </td>
      <td>
        {item.description.length > 20 ? (
          <Modal
            title={`${item.description.slice(0, 20)}...`}
            titleContent="Description"
            content={item.description}
            id={item.id}
          />
        ) : (
          item.description
        )}
      </td>
      <td className={`py-2 px-4 h-[8vh]`}>
        <span
          className={`badge badge-${ColorProductStatus(
            ConvertStatus(item.category)
          )} badge-outline badge-md`}
        >
          {ConvertStatus(item.category)}
        </span>
      </td>
      <td className="link link-primary">
        <Link
          href={`/products/history/${stringToHex(
            item.product.serialNumber
          )}?skip=0&take=7`}
          replace
        >
          {item.product.serialNumber.slice(0, 6) + "XXXX"}
        </Link>
      </td>
      <td>
        <ViewImg id={item.id} image={item.imageProve} />
      </td>
      <td>
        <ActionButton
          action={() => {}}
          styles="btn-info btn-sm"
          disabled={false}
        >
          <TbUserEdit size={20} /> Edit
        </ActionButton>
      </td>
    </tr>
  );
};

export default function TableUserHistory({
  history,
  isEditor,
}: TableUserHistoryProps) {
  return (
    <>
      <div className="mobile:hidden tablet:hidden laptop:block">
        <table className="table table-fixed w-full text-center">
          <thead>
            <tr>
              <th>Time</th>
              <th>Description</th>
              <th>Status</th>
              <th>Product</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => {
              return <TableRow key={item.id} item={item} />;
            })}
          </tbody>
        </table>
      </div>

      <div className="mobile:block laptop:hidden">
        {history.map((item) => {
          const { formattedDate, displayTime } = ConvertTime(item.createdAt);
          return (
            <div key={item.id} className="mt-3 card bg-base-100 w-96 shadow-xl">
              <div className="card-body">
                <div className="card-title flex justify-between">
                  <Link
                    href={`/products/history/${stringToHex(
                      item.product.serialNumber
                    )}?skip=0&take=7`}
                    className="link link-primary"
                  >
                    {item.product.serialNumber.slice(0, 6) + "XXXX"}
                  </Link>
                  <div>
                    <h2 className="text-sm">{formattedDate}</h2>
                  </div>
                </div>
                <p>{item.description}</p>
                <div className="flex justify-between">
                  <div
                    className={`badge badge-${ColorProductStatus(
                      ConvertStatus(item.category)
                    )} badge-outline badge-md`}
                  >
                    <p>{ConvertStatus(item.category)}</p>
                  </div>
                  <ViewImg id={item.id} image={item.imageProve} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
