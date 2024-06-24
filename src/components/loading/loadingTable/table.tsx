import React from "react";
import { FaHistory } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TbCopy } from "react-icons/tb";

const TableLoading = ({ Type, length }: { Type: string; length: number }) => {
  const columns: { [key: string]: string[] } = {
    User: ["Name", "Role", "Status", "Contact", "Action"],
    Product: [
      "",
      "Model",
      "Serial Number",
      "Status",
      "Merchant",
      "Bank",
      "History",
    ],
    Merchant: ["Name", "Address", "Contact", "Action"],
    History: ["Time", "Description", "User", "Category", "Image"],
  };

  const columnHeaders = columns[Type] || [];

  const TableRow: React.FC<{ item: number }> = ({ item }) => {
    return (
      <tr key={item}>
        {columnHeaders.map((header, index) => (
          <td key={index} className={`py-2 px-4 h-[8vh]`}>
            <div className="skeleton h-5 bg-opacity-10"></div>
          </td>
        ))}
      </tr>
    );
  };

  const mobileData = () => {
    if (Type === "User") {
      return (
        <div className="card skeleton w-[90vw] bg-base-100 shadow-xl">
          <div className="card-body p-5">
            <div className="card-title flex-col">
              <div className="flex w-full items-center">
                <div className="skeleton h-5 w-20 bg-opacity-10"></div>
              </div>
              <div className="divider my-0"></div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <div className="skeleton h-5 w-20 bg-opacity-10"></div>
                  <div className="skeleton h-5 w-20 bg-opacity-10"></div>
                </div>
                <div>
                  <div className="skeleton h-5 w-20 bg-opacity-10"></div>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <p>Contact</p>
                </div>
                <div>
                  <div className="skeleton h-5 w-20 bg-opacity-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (Type === "Product") {
      return (
        <div className="card skeleton w-[90vw] bg-base-100 shadow-xl">
          <div className="card-body p-5">
            <div className="card-title flex-col">
              <div className="flex w-full justify-between items-center">
                <div className="skeleton h-5 w-20 bg-opacity-10"></div>
                <button className="btn btn-sm text-xl btn-ghost">
                  <FaHistory />
                </button>
              </div>
              <div className="divider my-0"></div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <div className="skeleton h-5 w-20 bg-opacity-10"></div>
                </div>
                <div>
                  <div className="skeleton h-5 w-20 bg-opacity-10"></div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p>Merchant</p>
                  </div>
                  <div className="skeleton w-20 h-5 bg-opacity-10 btn text-xl btn-ghost"></div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p>Bank</p>
                  </div>
                  <div className="skeleton w-20 h-2 bg-opacity-10 btn text-xl btn-ghost"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (Type === "Merchant") {
      return (
        <div className="card w-[90vw] bg-base-100 shadow-xl">
          <div className="card-body p-5">
            <div className="card-title flex-col">
              <div className="flex w-full justify-between items-center">
                <div className="skeleton h-5 w-20 bg-opacity-10"></div>
              </div>
              <div className="divider my-0"></div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-base font-bold">
                    <div className="skeleton h-5 w-20 bg-opacity-10"></div>
                  </div>
                </div>
                <button className="text-lg tooltip">
                  <TbCopy />
                </button>
              </div>

              <div className="flex flex-col justify-between gap-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p>Contact</p>
                  </div>
                  <div className="skeleton h-5 w-20 bg-opacity-10"></div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p>Product Serial Number </p>
                  </div>
                  <div className="skeleton h-5 w-20 bg-opacity-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div
        className={`${
          Type === "History"
            ? "min-h-[50vh]"
            : "min-h-[63vh] mobile:hidden tablet:block laptop:block"
        } mt-3 w-[80vw]`}
      >
        <table className="table table-fixed w-full text-center">
          <thead>
            <tr>
              {columnHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: length }).map((_, index) => (
              <TableRow key={index} item={index} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile:block tablet:hidden laptop:hidden pb-5">
        {Array.from({ length: length }).map((_, index) => (
          <div key={index} className="mt-3">
            {mobileData()}
          </div>
        ))}
      </div>
    </>
  );
};

export default TableLoading;
