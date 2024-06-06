"use client";

import ActionButton from "@/components/actionButton";
import AlertDialog from "@/components/alertDialog";
import TablePageLoading from "@/components/loading/loadingTable/tablePage";
import TablePageProduct from "@/components/productTable/productTablePage";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

export default function productmanagement() {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [isEditor, setIseditor] = useState(true);

  const [loading, setLoading] = useState(true);

  const path = useSearchParams();
  const filter = path.get("filter") || "";
  const search = path.get("search") || "";
  const skip = path.get("skip") || "";
  const take = path.get("take") || "";
  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();
  const alertMessage = useSearchParams().get("alert") || "";

  useEffect(() => {
    if (alertMessage) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [alertMessage]);

  useEffect(() => {
    const updateData = async () => {
      try {
        const res = await axios.get(
          `/api/products/getProduct?filter=${filter}&search=${search}&skip=${skip}&take=${take}`
        );
        setData(res.data.products);
        setDataLength(res.data.totalProducts);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    updateData();
  }, [filter, search, skip, take]);

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-full relative">
          {showAlert && (
            <AlertDialog
              title="Products added successfully"
              styles="alert-success absolute bottom-8 left-8 w-fit"
              icon={<IoMdAddCircle size={20} />}
            />
          )}
          <div className="flex justify-between items-center mx-5 mt-5 mb-1 h-14">
            <h1 className="text-3xl font-bold">Product</h1>
            <div className={`${isEditor ? "" : "cursor-not-allowed"}`}>
              <ActionButton
                action={() => {
                  router.push("/products/add");
                }}
                styles={`btn-primary`}
                disabled={!isEditor}
              >
                Add Product
              </ActionButton>
            </div>
          </div>
          <div className="flex justify-end mx-5"></div>
          {loading ? (
            <TablePageLoading Type="Product" />
          ) : (
            <TablePageProduct
              data={data}
              editor={isEditor}
              totalLength={dataLength}
            />
          )}
        </div>
      </div>
    </>
  );
}
