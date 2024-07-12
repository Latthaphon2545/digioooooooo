"use client";

import AlertDialog, { SuccessStyle } from "@/components/alertDialog";
import Container from "@/components/container/container";
import FloatingActionButton from "@/components/floatingActionButton";
import TablePageLoading from "@/components/loading/loadingTable/tablePage";
import TablePageProduct from "@/components/table/productTable/productTablePage";
import { DetAllProduct } from "@/lib/actions/getAllProduct/action";
import { decode } from "@/lib/generateRandomHref";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";

const isEditor = true;

export default function Productmanagement() {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);

  const [loading, setLoading] = useState(true);

  const path = useSearchParams();
  const { filter, search, skip, take } = decode(path.toString());
  const alertMessage = useSearchParams().get("alert") || "";

  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>("");

  useEffect(() => {
    if (alertMessage) {
      setAlertTitle("Product added successfully");
      setAlertStyles(SuccessStyle);
      setAlertIcon(<AiOutlineUserAdd size={20} />);
    }
  }, [alertMessage]);

  useEffect(() => {
    const updateData = async () => {
      const res = await DetAllProduct({
        filter,
        search,
        skip,
        take,
        setLoading,
      });
      setData(res.products);
      setDataLength(res.totalProducts);
    };
    updateData();
  }, [filter, search, skip, take]);

  return (
    <Container
      isEditor={isEditor}
      title="Product"
      Information={
        loading ? (
          <TablePageLoading Type="Product" />
        ) : (
          <TablePageProduct
            data={data}
            editor={isEditor}
            totalLength={dataLength}
            skip={parseInt(skip)}
          />
        )
      }
      NavigatorBtn="/products/add"
      textBtn={<>Add Product</>}
      AlertDialog={
        <AlertDialog
          alertTitle={alertTitle}
          styles={alertStyles}
          icon={alertIcon}
          id={"userAdd"}
        />
      }
      FloatingActionButton={<FloatingActionButton page="product" />}
    />
  );
}
