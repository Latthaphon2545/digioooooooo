"use client";

import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import Table from "@/components/table/usersTable/usersTablePage";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ActionButton from "@/components/actionButton";
import TablePageLoading from "@/components/loading/loadingTable/tablePage";
import AlertDialog from "@/components/alertDialog";
import FloatingActionButton from "@/components/floatingActionButton";
import { encode, decode } from "@/lib/generateRandomHref";

export default function Home() {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [isEditor, setIseditor] = useState(true);

  const [loading, setLoading] = useState(true);

  const path = useSearchParams();
  const { filter, search, skip, take } = decode(path.toString());

  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();
  const alertMessage = useSearchParams().get("alert") || "";

  useEffect(() => {
    if (alertMessage) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }
  }, [alertMessage]);

  useEffect(() => {
    const updateData = async () => {
      try {
        const res = await axios.get(
          `/api/users/getUsers?filter=${filter}&search=${search}&skip=${skip}&take=${take}`
        );
        setData(res.data.users);
        setDataLength(res.data.length);
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
              title="User added successfully"
              styles="alert-success absolute bottom-8 left-8 w-fit"
              icon={<AiOutlineUserAdd size={20} />}
            />
          )}
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
