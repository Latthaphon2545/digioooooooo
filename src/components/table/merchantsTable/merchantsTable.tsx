import React, { useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import ActionButton from "@/components/actionButton";
import axios from "axios";
import AlertDialog, { Error, Success } from "@/components/alertDialog";
import Modal from "@/components/modal";
import { FaPhoneAlt } from "react-icons/fa";
import { EditableField } from "../EditableField";
import { productIdUI } from "../productIdShowEachShop";
import { handleEditToggle } from "../handleEditToggle";
import { ShowAlert } from "../showAlert";
import { RenderSubmitPopupButton } from "./renderSubmitPopupButton";

interface TableProps {
  dataForCurrentPage: {
    [key: string]: any;
  }[];
  editor?: boolean;
}

export default function Table({ dataForCurrentPage, editor }: TableProps) {
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [isUpdating, setIsUpdating] = useState<{ [key: string]: boolean }>({});

  const [copySuccess, setCopySuccess] = useState(false);

  const [updateAlert, setUpdateAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertStyles, setAlertStyles] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<></>);

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleUpdate = async (
    id: string,
    merchant: { name: string; address: string; contact: string }
  ) => {
    try {
      setIsUpdating({ ...isUpdating, [id]: true });
      setIsEditing({ ...isEditing, [id]: false });
      const res = await axios.patch(
        `/api/merchants/updateMerchant/${id}`,
        merchant
      );
    } catch (error) {
      console.error(error);
      ShowAlert(
        "Failed to update user",
        "alert-error mobile:bg-error tablet:bg-error ",
        setAlertTitle,
        setAlertStyles,
        setAlertIcon,
        setUpdateAlert,
        Error
      );
    } finally {
      dataForCurrentPage.map((item) => {
        if (item.id === id) {
          item.name = merchant.name;
          item.address = merchant.address;
          item.contact = merchant.contact;
        }
      });
      handleEditToggle(id, setIsEditing);
      ShowAlert(
        "User updated successfully",
        "alert-success mobile:bg-success tablet:bg-success",
        setAlertTitle,
        setAlertStyles,
        setAlertIcon,
        setUpdateAlert,
        Success
      );
      setUpdateAlert(true);
      setIsUpdating({ ...isUpdating, [id]: false });
      setIsEditing({ ...isEditing, [id]: false });
    }
  };

  const DestopView = ({ item }: { item: any }) => {
    const [name, setName] = useState(item.name);
    const [address, setAddress] = useState(item.address);
    const [contact, setContact] = useState(item.contact);

    return (
      <tr key={item.productId}>
        {isEditing[item.id] ? (
          <>
            <td className={` py-2 px-4 h-[8vh]`}>
              <EditableField defaultValue={item.name} onChange={setName} />
            </td>
            <td className="py-2 px-4 h-[8vh]">
              <EditableField
                defaultValue={item.address}
                onChange={setAddress}
                textarea={true}
              />
            </td>
            <td className={` py-2 px-4 h-[8vh]`}>
              <EditableField
                defaultValue={item.contact}
                onChange={setContact}
                contact={true}
              />
            </td>
          </>
        ) : (
          <>
            {/* Name */}
            <td className={` py-2 px-4 h-[8vh]`}>
              <div className="flex justify-around items-center">
                <div className=" w-full">
                  {item.name.length > 30 ? (
                    <Modal
                      title={`${item.name.slice(0, 30)}...`}
                      titleContent="Merchant Name"
                      content={item.name}
                      id={item.name}
                      boolClose={true}
                    />
                  ) : (
                    <p>{item.name}</p>
                  )}
                </div>
              </div>
            </td>

            {/* Address */}
            <td className={`py-2 px-4 h-[8vh]`}>
              {item.address.length > 20 ? (
                <Modal
                  title={`${item.address.slice(0, 20)}...`}
                  content={item.address}
                  id={item.address}
                  boolClose={true}
                />
              ) : (
                <p>{item.address}</p>
              )}
            </td>

            {/* Contact */}
            <td className={` py-2 px-4 h-[8vh]`}>
              {isEditing[item.id] ? (
                EditableField({
                  defaultValue: item.contact,
                  onChange: setContact,
                  contact: true,
                })
              ) : (
                <p>{item.contact}</p>
              )}
            </td>
          </>
        )}

        {/* Product Id */}
        <td className="py-2 px-4 h-[8vh]">
          {item.product && item.product.length > 0 ? (
            <Modal
              title="See Product"
              titleContent="Product Serial Number"
              content={productIdUI(item.product)}
              id={item.product}
              boolClose={true}
            />
          ) : (
            <p>No Product</p>
          )}
        </td>

        {/* Action */}
        <td className={`py-2 px-4 ${editor ? "" : "cursor-not-allowed"}`}>
          {isEditing[item.id] ? (
            <div className="flex gap-1 justify-center">
              <ActionButton
                action={() => handleEditToggle(item.id, setIsEditing)}
                styles="btn-error btn-sm"
              >
                Cancle
              </ActionButton>
              <RenderSubmitPopupButton
                id={item.id}
                name={name}
                address={address}
                contact={contact}
                handleUpdate={handleUpdate}
                isUpdating={isUpdating[item.id]}
              />
            </div>
          ) : (
            <ActionButton
              action={() => handleEditToggle(item.id, setIsEditing)}
              styles="btn-info btn-sm"
              disabled={!editor}
            >
              <TbUserEdit size={20} /> Edit
            </ActionButton>
          )}
        </td>
      </tr>
    );
  };

  const MobileView = ({ item }: { item: any }) => {
    return (
      <div className="card w-[90vw] bg-base-100 shadow-xl">
        <div className="card-body p-5">
          <div className="card-title flex-col">
            <div className="flex w-full justify-between items-center gap-10">
              {/* Address */}
              <h1 className=" text-gray-500 text-sm">{item.address}</h1>
              {/* Action */}
              {editor ? (
                <Modal
                  title={
                    <>
                      {isUpdating[item.id] ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <>
                          <TbUserEdit size={20} /> Edit
                        </>
                      )}
                    </>
                  }
                  titleContent=""
                  style="btn-info btn-sm"
                  id={`editMerchants${item.id}`}
                  content={ModalEditMobileMerchant({ item })}
                  action={() => {
                    setOpenEditModal(!openEditModal);
                  }}
                  boolClose={true}
                />
              ) : (
                <>
                  <ActionButton
                    action={() => handleEditToggle(item.id, setIsEditing)}
                    styles="btn-info btn-sm"
                    disabled={true}
                  >
                    <TbUserEdit size={20} /> Edit
                  </ActionButton>
                </>
              )}
            </div>
            <div className="divider my-0"></div>
          </div>
          <div className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex justify-between items-center">
              <div>
                <div className="text-base">
                  <p className="font-bold">{item.name}</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col justify-between gap-2">
              <div className="flex justify-between items-center">
                <div>Contact</div>
                <a
                  className="flex gap-2 link link-primary"
                  href={`tel:${item.contact}`}
                >
                  <span>{item.contact}</span>
                  <span>
                    <FaPhoneAlt />
                  </span>
                </a>
              </div>

              {/* Product SN */}
              <div className="flex justify-between items-center">
                <div>Product Serial Number</div>
                <div>
                  {item.product && item.product.length > 0 ? (
                    <Modal
                      title="See Product"
                      titleContent="Product Serial Number"
                      content={productIdUI(item.product)}
                      id={item.product}
                      boolClose={true}
                    />
                  ) : (
                    <p>-</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ModalEditMobileMerchant = ({ item }: { item: any }) => {
    const [name, setName] = useState(item.name);
    const [address, setAddress] = useState(item.address);
    const [contact, setContact] = useState(item.contact);

    return (
      <div className="px-5 flex flex-col gap-5 items-center">
        <div className="w-full">
          <p className="text-gray-500">Name</p>
          <EditableField defaultValue={name} onChange={setName} />
        </div>

        <div className="w-full ">
          <p className="text-gray-500">Address</p>
          <EditableField
            defaultValue={address}
            onChange={setAddress}
            textarea={true}
          />
        </div>

        <div className="w-full">
          <p className="text-gray-500">Contact</p>
          <EditableField
            defaultValue={contact}
            onChange={setContact}
            contact={true}
          />
        </div>

        <RenderSubmitPopupButton
          id={item.id}
          name={name}
          address={address}
          contact={contact}
          handleUpdate={handleUpdate}
          isUpdating={isUpdating[item.id]}
          mobile={true}
        />
      </div>
    );
  };

  return (
    <>
      <div className="min-h-[63vh] mt-3 w-[80vw] mobile:hidden tablet:hidden laptop:block">
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
              <DestopView key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mobile:block tablet:block laptop:hidden pb-5">
        {dataForCurrentPage.map((item) => (
          <div key={item.id} className="mt-3">
            <MobileView item={item} />
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
