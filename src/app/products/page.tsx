"use client";

import ActionButton from "@/components/actionButton";
import AlertDialog from "@/components/alertDialog";
import FloatingActionButton from "@/components/floatingActionButton";
import TablePageLoading from "@/components/loading/loadingTable/tablePage";
import TablePageProduct from "@/components/table/productTable/productTablePage";
import { decode } from "@/lib/generateRandomHref";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";

export default function Productmanagement() {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [isEditor, setIseditor] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const [loading, setLoading] = useState(true);

  const path = useSearchParams();
  const { filter, search, skip, take } = decode(path.toString());
  const router = useRouter();
  const alertMessage = useSearchParams().get("alert") || "";

  useEffect(() => {
    if (alertMessage) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      console.log("alertMessage", alertMessage);
    }
  }, [alertMessage]);

  useEffect(() => {
    const updateData = async () => {
      try {
        const res = await axios.get(
          `/api/products/getProduct?filter=${filter}&search=${search}&skip=${skip}&take=${take}`
        );
        setData(res.data.products || []);
        setDataLength(res.data.totalProducts || 0);
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
              title="Product added successfully"
              styles="alert-success absolute bottom-8 left-8 w-fit"
              icon={<AiOutlineUserAdd size={20} />}
            />
          )}
          <div className="flex justify-between items-center mx-5 mt-5 mb-1 h-14 mobile:hidden laptop:flex">
            <h1 className="text-3xl font-bold">Product</h1>
            <div className={`${isEditor ? "" : "cursor-not-allowed"}`}>
              <div className="mobile:hidden laptop:block">
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
          </div>
          <FloatingActionButton page="product" />
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
