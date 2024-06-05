import React, { useState, useRef, Dispatch } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { read as readXlsx, utils as utilsXlsx } from "xlsx";
import { GrDocumentUpload } from "react-icons/gr";
import { InputPreview } from "./usersForm/inputPreview";
import { DataItem, Model, Role } from "@/lib/types";
import ProgressIndicator from "./progressIndicator";

type GroupUploadProps = {
  setHasError: (hasError: boolean) => void;
  headers: string[];
  models?: Model[];
  setGroupData: (data: Array<DataItem>) => void;
  page: "user" | "product";
  uploading: boolean;
  setUploading: Dispatch<boolean>;
};

const GroupUpload = ({
  setHasError,
  headers,
  models,
  setGroupData,
  page,
  uploading,
  setUploading,
}: GroupUploadProps) => {
  const [data, setData] = useState<
    Array<{
      email?: string;
      name?: string;
      contact?: string;
      role?: Role;
      sn?: string;
      model?: string;
    }>
  >([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorCount, setErrorCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const modelNames = models?.map((item) => item.series);

  const validateEmailAndRole = (
    email: string,
    role: Role,
    data: Array<DataItem>,
    index: number
  ) => {
    const isDuplicate = data
      .slice(0, index)
      .some((item) => item.email === email);
    return (
      isDuplicate ||
      !email.endsWith("@digio.co.th") ||
      !Object.values(Role).includes(
        role.toUpperCase().replace(/ +/g, "") as Role
      )
    );
  };

  const validateSn = (sn: string, data: Array<DataItem>, index: number) => {
    const isDuplicate = data.slice(0, index).some((item) => item.sn === sn);
    return isDuplicate;
  };

  const validateModel = (inputModel: string) => {
    return !models
      ?.map((item) => item.series.toLowerCase())
      .includes(inputModel!.toLowerCase().trim().replace(/ +/g, "") || "");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFileName(file.name);
    const reader = new FileReader();

    reader.onloadstart = () => {
      setUploading(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 200);
    };

    reader.onload = (e) => {
      setTimeout(() => {
        const bufferArray = e.target!.result;
        const wb = readXlsx(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = utilsXlsx.sheet_to_json(ws, {
          header: headers,
        }) as Array<DataItem>;
        const filteredData = data
          .filter(
            (item) =>
              (page === "user" &&
                item.email &&
                item.name &&
                item.contact &&
                item.role) ||
              (page === "product" && item.sn && item.model)
          )
          .map((item) => {
            if (page === "product") {
              return {
                sn: item.sn?.toString() || "",
                model: item.model,
              };
            } else {
              return {
                email: item.email || "",
                name: item.name || "",
                contact: item.contact || "",
                role: item.role as Role,
              };
            }
          });
        filteredData.shift();
        filteredData.forEach((item) => {
          console.log(typeof item.sn as string);
        });
        setData(filteredData);
        setGroupData(filteredData);

        // const hasError = filteredData.some((row) =>
        //   headers[0] === "email"
        //     ? !row.email?.endsWith("@digio.co.th")
        //     : !modelNames?.includes(row.model || "")
        // );
        // setHasError(hasError);

        const errorCount = filteredData.filter((row) =>
          headers[0] === "email"
            ? // ? !row.email?.endsWith("@digio.co.th") ||
              //   !Object.values(Role).includes(
              //     row.role.toUpperCase().replace(/ +/g, "") as Role
              //   )
              // : !model?.includes(row.model!.trim().replace(/ +/g, "") || "")
              validateEmailAndRole(
                row.email!,
                row.role!,
                filteredData,
                filteredData.indexOf(row)
              )
            : validateModel(row.model!) ||
              validateSn(row.sn!, filteredData, filteredData.indexOf(row))
        ).length;
        const hasError = errorCount > 0;
        setHasError(hasError);
        setErrorCount(errorCount);
        setUploading(false);
      }, 2000);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDivClick = () => {
    fileInputRef.current!.click();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center flex-grow space-x-8">
      <input
        type="file"
        ref={fileInputRef}
        className="border w-full max-w-xs hidden"
        onChange={handleFileUpload}
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <div
          className="border-dotted border-2 text-lg text-center min-w-72 min-h-52 flex items-center justify-center hover:cursor-pointer"
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
          href={`/uploadTemplate/${
            page === "product" ? "ProductTemplate" : "UserTemplate"
          }.xlsx`}
          download
        >
          <MdOutlineFileDownload className="w-10 h-10" />
          <p>Download Template</p>
        </a>
      </div>
      <div className="relative">
        <div className="border-2 min-w-[40rem] min-h-[30rem] max-h-[30rem] overflow-scroll relative">
          {uploading && <ProgressIndicator uploadProgress={uploadProgress} />}
          {!uploading && (
            <InputPreview
              data={data}
              headers={headers}
              modelNames={modelNames}
              uploading={uploading}
            />
          )}
        </div>
        {data.length > 0 && (
          <div className="absolute -bottom-10 left-2 flex flex-wrap space-x-2">
            <span className="badge badge-primary badge-lg py-4 px-3">
              Total {data.length}
            </span>
            <span
              className={`badge ${
                errorCount > 0 ? "badge-error" : "badge-success"
              } badge-lg py-4 px-3`}
            >
              {errorCount > 0 ? `Error ${errorCount}` : "Success"}
            </span>
          </div>
        )}
        {/* <div className="relative">
          {uploading && (
            <div
              className={`radial-progress text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
              style={{ "--value": uploadProgress } as CustomCSSProperties}
              role="progressbar"
            >
              {uploadProgress}%
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default GroupUpload;
