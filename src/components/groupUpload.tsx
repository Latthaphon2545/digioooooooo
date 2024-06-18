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
  page: "user" | "product" | "merchant";
  uploading: boolean;
  setUploading: Dispatch<boolean>;
  setErrorOnSubmit: React.Dispatch<React.SetStateAction<string>>;
};

const GroupUpload = ({
  setHasError,
  headers,
  models,
  setGroupData,
  page,
  uploading,
  setUploading,
  setErrorOnSubmit,
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
  const expectedHeaders = {
    user: ["email", "name", "contact", "role"],
    product: ["model", "sn"],
    merchant: ["name", "address", "contact"],
  };

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
        const fileExtension = file.name.split(".").pop();
        if (fileExtension !== "xlsx" && fileExtension !== "csv") {
          setErrorOnSubmit(
            "Invalid file format. Please upload an xlsx or csv file."
          );
          setUploading(false);
          return;
        }

        const fileHeaders = utilsXlsx.sheet_to_json(ws, {
          header: 1,
        })[0] as string[];
        const expectedHeaderList = expectedHeaders[page];

        const headersMatch = fileHeaders.every(
          (header, index) => header === expectedHeaderList[index]
        );

        if (!headersMatch) {
          setErrorOnSubmit(
            "The headers of the uploaded file do not match the expected headers. It should be " +
              expectedHeaderList.join(", ")
          );
          setUploading(false);
          return;
        }

        const data = utilsXlsx.sheet_to_json(ws, {
          header: headers,
          raw: false,
        }) as Array<DataItem>;
        const filteredData = data
          .filter(
            (item) =>
              (page === "user" &&
                item.email &&
                item.name &&
                item.contact &&
                item.role) ||
              (page === "product" && item.sn && item.model) ||
              (page === "merchant" && item.name && item.address && item.contact)
          )
          .map((item) => {
            if (page === "product") {
              return {
                sn: item.sn?.toString() || "",
                model: item.model,
              };
            } else if (page === "user") {
              return {
                email: item.email || "",
                name: item.name || "",
                contact: item.contact || "",
                role: item.role as Role,
              };
            } else {
              return {
                name: item.name || "",
                address: item.address || "",
                contact: item.contact || "",
              };
            }
          });

        filteredData.shift();
        filteredData.forEach((item) => {
          console.log(typeof item.contact as string);
        });
        setData(filteredData);
        setGroupData(filteredData);

        const errorCount = filteredData.filter((row) =>
          page === "user"
            ? validateEmailAndRole(
                row.email!,
                row.role!,
                filteredData,
                filteredData.indexOf(row)
              )
            : page === "product"
            ? validateModel(row.model!) ||
              validateSn(row.sn!, filteredData, filteredData.indexOf(row))
            : null
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
    <div className="flex mobile:flex-col lg:flex-row justify-center flex-grow gap-4  px-10">
      <div className="flex flex-col items-center justify-center space-y-4 px-10">
        <input
          type="file"
          ref={fileInputRef}
          className="border w-full max-w-xs hidden"
          onChange={handleFileUpload}
        />
        <div
          className="border-dotted border-2 text-lg text-center p-4 tablet:min-w-72 tablet:min-h-52 flex items-center justify-center hover:cursor-pointer"
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
            page === "product"
              ? "ProductTemplate"
              : page === "user"
              ? "UserTemplate"
              : "MerchantTemplate"
          }.xlsx`}
          download
        >
          <MdOutlineFileDownload className="w-10 h-10" />
          <p>Download Template</p>
        </a>
      </div>
      <div className="relative w-full mobile:h-[48vh] tablet:h-[55vh] flex justify-center">
        <div className="border-2 h-full w-5/6  overflow-scroll relative">
          {uploading && <ProgressIndicator uploadProgress={uploadProgress} />}
          {!uploading && (
            <InputPreview
              data={data}
              page={page}
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
      </div>
    </div>
  );
};

export default GroupUpload;
