"use client";

import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import Table from "@/components/table/usersTable/usersTablePage";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ActionButton from "@/components/actionButton";
import TablePageLoading from "@/components/loading/loadingTable/tablePage";
import AlertDialog, { SuccessStyle } from "@/components/alertDialog";
import FloatingActionButton from "@/components/floatingActionButton";
import { decode } from "@/lib/generateRandomHref";
import { GetAllUsers } from "@/lib/actions/getUsers/action";
import { ShowAlert } from "@/components/showAlert";

export default function Home() {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [isEditor, setIseditor] = useState(true);

  const [loading, setLoading] = useState(true);

  const path = useSearchParams();
  const { filter, search, skip, take } = decode(path.toString());

  const router = useRouter();
  const alertMessage = useSearchParams().get("alert") || "";

  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (alertMessage) {
      setShowAlert(true);
      ShowAlert(
        "User added successfully",
        SuccessStyle,
        setAlertTitle,
        setAlertStyles,
        setAlertIcon,
        setShowAlert,
        <AiOutlineUserAdd size={20} />
      );
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
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-full relative">
          <AlertDialog
            open={showAlert}
            title={alertTitle}
            styles={alertStyles}
            icon={alertIcon}
            id={"userAdd"}
          />

          <div className="justify-between items-center mx-5 mt-5 mb-1 h-14  mobile:hidden laptop:flex">
            <h1 className="text-3xl font-bold">User</h1>
            <div className={`${isEditor ? "" : "cursor-not-allowed"}`}>
              <div className="mobile:hidden laptop:block">
                <ActionButton
                  action={() => {
                    router.push("/users/add");
                  }}
                  styles={`btn-primary`}
                  disabled={!isEditor}
                >
                  <AiOutlineUserAdd size={20} /> Add users
                </ActionButton>
              </div>
            </div>
          </div>
          <FloatingActionButton page="user" />
          <div className="flex justify-end mx-5"></div>
          {loading ? (
            <TablePageLoading Type="User" />
          ) : (
            <Table
              data={data}
              editor={isEditor}
              totalLength={dataLength}
              skip={parseInt(skip)}
            />
          )}
        </div>
      </div>
    </>
  );
}
