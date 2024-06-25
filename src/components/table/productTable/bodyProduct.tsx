import React, { useState } from "react";

import AlertDialog from "@/components/alertDialog";
import { DesktopView } from "./view/desktopView";
import { MobileView } from "./view/mobileView";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  editor?: boolean;
}

export default function Table({ dataForCurrentPage, editor }: TableProps) {
  const [updateAlert, setUpdateAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);

  return (
    <>
      <div className="min-h-[63vh] mt-3 w-[80vw] mobile:hidden tablet:hidden laptop:block">
        <table className="table table-fixed w-full text-center">
          <thead>
            <tr>
              <th></th>
              <th>Model</th>
              <th>Serial Number</th>
              <th>Status</th>
              <th>Merchant</th>
              <th>Bank</th>
              <th>History</th>
            </tr>
          </thead>
          <tbody>
            {dataForCurrentPage.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-2 px-4 h-[8vh]">
                  No data available
                </td>
              </tr>
            )}
            {dataForCurrentPage.map((item) => (
              <DesktopView
                key={item.serialNumber}
                item={item}
                dataForCurrentPage={dataForCurrentPage}
                setUpdateAlert={setUpdateAlert}
                setAlertTitle={setAlertTitle}
                setAlertStyles={setAlertStyles}
                setAlertIcon={setAlertIcon}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile:block tablet:block laptop:hidden pb-5">
        {dataForCurrentPage.map((item) => (
          <div key={item.serialNumber} className="mt-3">
            <MobileView
              item={item}
              dataForCurrentPage={dataForCurrentPage}
              setUpdateAlert={setUpdateAlert}
              setAlertTitle={setAlertTitle}
              setAlertStyles={setAlertStyles}
              setAlertIcon={setAlertIcon}
            />
          </div>
        ))}
      </div>

      <div className="fixed bottom-4 left-[15%] w-[20%]">
        {updateAlert && (
          <AlertDialog
            title={alertTitle}
            styles={alertStyles}
            icon={alertIcon}
          />
        )}
      </div>
    </>
  );
}
