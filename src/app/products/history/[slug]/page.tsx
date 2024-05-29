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
    time: `${i + 1}:00 - 12/12/2021`,
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    user: "User",
    category: ["Check Stock"],
  }));

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between items-center mx-5 mt-5 mb-1 h-14">
            <h1 className="text-3xl font-bold">
              <Link href="/products" className="curser-pointer">
                Product
              </Link>
              <span className="font-normal">{` > ${params.slug}`}</span>
            </h1>
          </div>
          <div className="flex justify-end mx-5"></div>
          <TablePageProductHistory
            data={data}
            dataCustomer={dataCustomer}
            editor={false}
          />
        </div>
      </div>
    </>
  );
}
