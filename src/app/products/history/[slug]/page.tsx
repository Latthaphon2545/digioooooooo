import TablePageProductHistory from "@/components/historyProduct/historyProductTablePage";
import Link from "next/link";

export default function Page({ params }: { params: { slug: string } }) {
  const dataCustomer = Array.from({ length: 1 }, (_, i) => ({
    model: `Model 1`,
    serialNumber: params.slug,
    status: "Installed",
    merchant: `Merchant 1`,
    bank: `Bank 1`,
  }));

  const data = Array.from({ length: 8 }, (_, i) => ({
    time: "12:00 - 12/12/2021",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    user: "User",
    category: "Check Stock",
  }));

  return (
    <>
      <div>
        <TablePageProductHistory
          data={data}
          dataCustomer={dataCustomer}
          colorStatus="product"
          editor={true}
        />
      </div>
    </>
  );
}
