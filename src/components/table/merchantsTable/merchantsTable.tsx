import React, { useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import Link from "next/link";
import Modal from "@/components/modal";
import ActionButton from "@/components/actionButton";
import { TbCopy } from "react-icons/tb";
import { TbCopyCheckFilled } from "react-icons/tb";
import axios from "axios";
import AlertDialog, { Error, Success } from "@/components/alertDialog";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  colorProductStatus: (status: string) => string;
  editor?: boolean;
}

export default function Table({
  dataForCurrentPage,
  colorProductStatus,
  editor,
}: TableProps) {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

  const [updateAlert, setUpdateAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);

  const showAlert = (title: string, styles: string, icon?: React.ReactNode) => {
    setAlertTitle(title);
    setAlertStyles(styles);
    setAlertIcon(icon);
    setUpdateAlert(true);
    setTimeout(() => setUpdateAlert(false), 3000);
  };

  const handleEditToggle = (key: string) => {
    setIsEditing((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleUpdate = async (
    id: string,
    merchant: { name: string; address: string; contact: string }
  ) => {
    try {
      if (!confirm("Are you sure you want to update this merchant?")) return;
      const res = await axios.patch(
        `/api/merchants/updateMerchant/${id}`,
        merchant
      );
    } catch (error) {
      console.error(error);
      setUpdateAlert(true);
      showAlert("Failed to update user", "alert-error", Error);
    } finally {
      dataForCurrentPage.map((item) => {
        if (item.id === id) {
          item.name = merchant.name;
          item.address = merchant.address;
          item.contact = merchant.contact;
        }
      });
      handleEditToggle(id);
      setUpdateAlert(true);
      showAlert("User updated successfully", "alert-success", Success);
    }
  };

  const TableRow = ({ item }: { item: any }) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const [name, setName] = useState(item.name);
    const [address, setAddress] = useState(item.address);
    const [contact, setContact] = useState(item.contact);

    const copylink = (e: any) => {
      e.preventDefault();
      navigator.clipboard.writeText(item.id);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    };

    return (
      <tr key={item.productId}>
        {/* Name */}
        <td className={` py-2 px-4 h-[8vh]`}>
          {isEditing[item.id] ? (
            EditableField({ defaultValue: item.name, onChange: setName })
          ) : (
            <div className="flex justify-around items-center">
              <p className=" w-full">{item.name}</p>
              <button
                onClick={copylink}
                className="text-lg tooltip"
                data-tip={copySuccess ? "Copied!" : "Copy"}
              >
                {copySuccess ? <TbCopyCheckFilled /> : <TbCopy />}
              </button>
            </div>
          )}
        </td>

        {/* Address */}
        <td className={`py-2 px-4 h-[8vh]`}>
          {isEditing[item.id] ? (
            EditableField({
              defaultValue: item.address,
              onChange: setAddress,
              textarea: true,
            })
          ) : item.address.length > 20 ? (
            <Modal
              title={
                item.address.length > 20
                  ? `${item.address.slice(0, 20)}...`
                  : item.address
              }
              titleContent="Address"
              content={item.address}
            />
          ) : (
            <p>{item.address}</p>
          )}
        </td>

        {/* Contact */}
        <td className={` py-2 px-4 h-[8vh]`}>
          {isEditing[item.id] ? (
            EditableField({ defaultValue: item.contact, onChange: setContact })
          ) : (
            <p>{item.contact}</p>
          )}
        </td>

        {/* Product Id */}
        <td className="py-2 px-4 h-[8vh]">
          {item.product && item.product.length > 0 ? (
            <p>{item.product.map((p: any) => p.serialNumber).join(", ")}</p>
          ) : (
            <p>No product</p>
          )}
        </td>

        {/* Action */}
        <td className={`py-2 px-4 ${editor ? "" : "cursor-not-allowed"}`}>
          {isEditing[item.id] ? (
            <div className="flex gap-1 justify-center">
              <ActionButton
                action={() => handleEditToggle(item.id)}
                styles="btn-error"
              >
                Cancle
              </ActionButton>

              <ActionButton
                action={async () => {
                  setIsUpdate(true);
                  await handleUpdate(item.id, {
                    name,
                    address,
                    contact,
                  });
                  setIsUpdate(false);
                }}
                styles="btn-success"
              >
                {isUpdate ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  "Update"
                )}
              </ActionButton>
            </div>
          ) : (
            <ActionButton
              action={() => handleEditToggle(item.id)}
              styles="btn-info"
              disabled={!editor}
            >
              <TbUserEdit size={20} /> Edit
            </ActionButton>
          )}
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="min-h-[70vh] mt-3 w-[80vw]">
        <table className="table table-fixed w-full text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Product Serial Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataForCurrentPage.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-2 px-4 h-[8vh]">
                  No data available
                </td>
              </tr>
            )}
            {dataForCurrentPage.map((item) => (
              <TableRow key={item.name} item={item} />
            ))}
          </tbody>
        </table>
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

const EditableField = ({
  defaultValue,
  onChange,
  textarea = false,
}: {
  defaultValue: string;
  onChange: (value: string) => void;
  textarea?: boolean;
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  if (textarea) {
    return (
      <textarea
        value={value}
        className="border-2 border-base-content rounded-md p-1 w-full"
        onChange={handleChange}
      />
    );
  } else {
    return (
      <input
        type="text"
        value={value}
        className="border-2 border-base-content rounded-md p-1 w-fit text-center"
        onChange={handleChange}
      />
    );
  }
};
