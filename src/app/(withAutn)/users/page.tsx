"use client";

import { AiOutlineUserAdd } from "react-icons/ai";
import Table from "@/components/table/usersTable/usersTablePage";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import TablePageLoading from "@/components/loading/loadingTable/tablePage";
import AlertDialog, { SuccessStyle } from "@/components/alertDialog";
import FloatingActionButton from "@/components/floatingActionButton";
import { decode } from "@/lib/generateRandomHref";
import { GetAllUsers } from "@/lib/actions/getUsers/action";
import Link from "next/link";
import Container from "@/components/container/container";

const isEditor = true;

export default function Home() {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);

  const [loading, setLoading] = useState(true);

  const path = useSearchParams();
  const { filter, search, skip, take } = decode(path.toString());

  const alertMessage = useSearchParams().get("alert") || "";

  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (alertMessage) {
      setShowAlert(true);
      // ShowAlert(
      //   "User added successfully",
      //   SuccessStyle,
      //   setAlertTitle,
      //   setAlertStyles,
      //   setAlertIcon,
      //   setShowAlert,
      //   <AiOutlineUserAdd size={20} />
      // );
    }
  }, [alertMessage]);

  useEffect(() => {
    const updateData = async () => {
      const res = await GetAllUsers({
        filter,
        search,
        skip,
        take,
        setLoading,
      });
      setData(res.users);
      setDataLength(res.length);
    };
    updateData();
  }, [filter, search, skip, take]);

  return (
    <Container
      AlertDialog={
        <AlertDialog
          open={showAlert}
          title={alertTitle}
          styles={alertStyles}
          icon={alertIcon}
          id={"userAdd"}
        />
      }
      title="User"
      BtnAction={
        <div className={`${isEditor ? "" : "cursor-not-allowed"}`}>
          <div className="mobile:hidden laptop:block">
            {isEditor ? (
              <Link href="/users/add">
                <button className={` btn btn-primary`}>
                  <AiOutlineUserAdd size={20} /> Add users
                </button>
              </Link>
            ) : (
              <button className={` btn btn-primary`} disabled>
                <AiOutlineUserAdd size={20} /> Add users
              </button>
            )}
          </div>
        </div>
      }
      FloatingActionButton={<FloatingActionButton page="user" />}
      Information={
        loading ? (
          <TablePageLoading Type="User" />
        ) : (
          <Table
            data={data}
            editor={isEditor}
            totalLength={dataLength}
            skip={parseInt(skip)}
          />
        )
      }
    />
  );
}
