"use client";

import Link from "next/link";
import { ConvertStatus } from "../../convertStatusAndRole";
import { ColorProductStatus } from "../color";

export const productIdUI = (products: any) => {
  return (
    <table className="table table-fixed w-full text-center">
      <thead>
        <tr>
          <th>Series</th>
          <th>Serial Number</th>
          <th>Product Status</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: any) => (
          <tr key={product.serialNumber}>
            <td>{product.model.series}</td>
            <td className="link link-primary">
              <Link href={`products/history/${product.serialNumber}`}>
                {product.serialNumber.slice(0, 6) + "XXXX"}
              </Link>
            </td>
            <td>
              <span
                className={`badge badge-${ColorProductStatus(
                  ConvertStatus(product.status)
                )} badge-outline badge-md`}
              >
                {ConvertStatus(product.status)}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
