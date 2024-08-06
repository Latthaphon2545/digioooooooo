"use client";

import { AiOutlineUserAdd } from "react-icons/ai";
import TableUser from "@/components/table/usersTable/usersTablePage";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import TablePageLoading from "@/components/loading/loadingTable/tablePage";
import AlertDialog, { SuccessStyle } from "@/components/alertDialog";
import FloatingActionButton from "@/components/floatingActionButton";
import { decode } from "@/lib/generateRandomHref";
import Container from "@/components/container/containerTable";
import { GetAllUsers } from "@/lib/actions/UserPage/getUsers/action";
import { useEditor } from "@/lib/context/EditorProvider";
import axios from "axios";

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

  const isEditor = useEditor();

  useEffect(() => {
    if (alertMessage) {
      setAlertTitle("User added successfully");
      setAlertStyles(SuccessStyle);
      setAlertIcon(<AiOutlineUserAdd size={20} />);
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
      const test = await axios.get(
        "https://planetx-dev.digipay.dev/core-wallet/v1/wallet",
        {
          headers: {
            "X-Req-Id": "123",
            "X-Req-Date": "2021-09-01",
          },
        }
      );
      console.log(test);
      setData(res.users);
      setDataLength(res.length);
    };
    updateData();
  }, [filter, search, skip, take]);

  return (
    <Container
      isEditor={isEditor}
      title="User"
      Loading={loading}
      LoadingChild={<TablePageLoading Type="User" />}
      Child={
        <TableUser
          data={data}
          editor={isEditor}
          totalLength={dataLength}
          skip={parseInt(skip)}
        />
      }
      NavigatorBtn="/users/add"
      textBtn={
        <>
          <AiOutlineUserAdd size={20} /> Add users
        </>
      }
      AlertDialog={
        <AlertDialog
          alertTitle={alertTitle}
          styles={alertStyles}
          icon={alertIcon}
          id={"userAdd"}
          setAlertTitle={setAlertTitle}
        />
      }
      FloatingActionButton={<FloatingActionButton page="user" />}
    />
  );
}
