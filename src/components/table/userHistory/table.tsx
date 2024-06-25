import React from "react";
import ViewImg from "../historyProduct/historyProductViewImg";
import { ConvertTime } from "@/components/dateTime";
import { ConvertStatus } from "@/components/convertStatusAndRole";
import Link from "next/link";
import { ColorProductStatus } from "../color";
import Modal from "@/components/modal";

type TableUserHistoryProps = {
  history: any[];
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
        <Modal
          title={`${item.description.slice(0, 20)}...`}
          titleContent="Description"
          content={item.description}
          id={item.id}
        />
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
      {/* <td className="link link-primary">
        <Link
          href={`products/history/${item.product.serialNumber}?filter=&search=&skip=0&take=7`}
        >
          {item.product.serialNumber}
        </Link>
      </td> */}
      <td>
        <ViewImg id={item.id} image={item.imageProve} />
      </td>
    </tr>
  );
};

export default function TableUserHistory({ history }: TableUserHistoryProps) {
  return (
    <div className="mobile:hidden tablet:hidden laptop:block">
      <table className="table table-fixed w-full text-center">
        <thead>
          <tr>
            <th>Time</th>
            <th>Description</th>
            <th>Category</th>
            {/* <th>Product</th> */}
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => {
            return <TableRow key={item.id} item={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
