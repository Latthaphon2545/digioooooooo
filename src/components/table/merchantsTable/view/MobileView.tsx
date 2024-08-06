import ActionButton from "@/components/actionButton";
import Modal from "@/components/modal";
import { useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import { handleEditToggle } from "../../handleEditToggle";
import { FaPhoneAlt } from "react-icons/fa";
import { productIdUI } from "../productIdShowEachShop";
import { EditableField } from "../../EditableField";
import { RenderSubmitPopupButton } from "../renderSubmitPopupButton";

interface MobileViewProps {
  item: any;
  editor?: boolean;
  setIsEditing: any;
  handleUpdate: (
    id: string,
    merchant: { name: string; address: string; contact: string }
  ) => Promise<void>;
  isUpdating: any;
}

export const MobileView = ({
  item,
  editor,
  isUpdating,
  setIsEditing,
  handleUpdate,
}: MobileViewProps) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);
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
                NameBtn={
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
                styleBtn="btn-info btn-sm"
                id={`editMerchants${item.id}`}
                content={ModalEditMobileMerchant({
                  item,
                  handleUpdate,
                  isUpdating,
                  setOpenEditModal,
                })}
                open={openEditModal}
                setOpen={setOpenEditModal}
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
                    NameBtn="See Product"
                    titleContent="Product Serial Number"
                    content={productIdUI(item.product)}
                    id={item.product}
                    open={openProductModal}
                    setOpen={setOpenProductModal}
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

const ModalEditMobileMerchant = ({
  item,
  handleUpdate,
  isUpdating,
  setOpenEditModal,
}: {
  item: any;
  handleUpdate: any;
  isUpdating: any;
  setOpenEditModal: (value: boolean) => void;
}) => {
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
        setOpenEditModal={setOpenEditModal}
      />
    </div>
  );
};
