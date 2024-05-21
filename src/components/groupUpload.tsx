import React, { useState, useRef } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { read as readXlsx, utils as utilsXlsx } from "xlsx";
import { GrDocumentUpload } from "react-icons/gr";
import { InputPreview } from "./inputPreview";

type GroupUploadProps = {
  setHasError: (hasError: boolean) => void;
  headers: string[];
};

type DataItem = {
  email?: string;
  name?: string;
  contact?: string;
  sn?: string;
  model?: string;
};

const GroupUpload = ({ setHasError, headers }: GroupUploadProps) => {
  const [data, setData] = useState<
    Array<{ email: string; name: string; contact: string }>
  >([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const bufferArray = e.target!.result;
      const wb = readXlsx(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utilsXlsx.sheet_to_json(ws, {
        header: headers,
      }) as Array<DataItem>;
      const filteredData = data
        .filter((item) => item.email && item.name && item.contact)
        .map((item) => ({
          email: item.email || "",
          name: item.name || "",
          contact: item.contact || "",
        }));
      filteredData.shift();
      setData(filteredData);
      const hasError = filteredData.some(
        (row) => !row.email?.endsWith("@digio.co.th")
      );
      setHasError(hasError);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDivClick = () => {
    fileInputRef.current!.click();
  };

  return (
    <div className="flex flex-row justify-center flex-grow space-x-8">
      <input
        type="file"
        ref={fileInputRef}
        className="border w-full max-w-xs hidden"
        onChange={handleFileUpload}
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <div
          className="border-dotted border-2 text-lg text-center min-w-72 min-h-52 flex items-center justify-center"
          onClick={handleDivClick}
        >
          <div>
            <GrDocumentUpload className="w-10 h-10 mx-auto mb-2" />
            {data.length >= 1 ? (
              <p className="text-sm">{fileName}</p>
            ) : (
              <p>Click or drag file here</p>
            )}
          </div>
        </div>
        <a
          className="flex flex-row items-center text-lg cursor-pointer"
          download={""}
        >
          <MdOutlineFileDownload className="w-10 h-10" />
          <p>Download Template</p>
        </a>
      </div>
      <div className="border-2 min-w-[40rem] min-h-[30rem] max-h-[35rem] overflow-scroll">
        <InputPreview data={data} />
      </div>
    </div>
  );
};

export default GroupUpload;
