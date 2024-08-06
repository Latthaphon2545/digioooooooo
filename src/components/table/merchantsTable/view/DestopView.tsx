import { useState } from "react";
import { EditableField } from "../../EditableField";
import Modal from "@/components/modal";
import { productIdUI } from "../productIdShowEachShop";
import ActionButton from "@/components/actionButton";
import { handleEditToggle } from "../../handleEditToggle";
import { TbUserEdit } from "react-icons/tb";
import { RenderSubmitPopupButton } from "../renderSubmitPopupButton";

interface DestopViewProps {
  item: any;
  isEditing: any;
  editor?: boolean;
  setIsEditing: any;
  handleUpdate: (
    id: string,
    merchant: { name: string; address: string; contact: string }
  ) => Promise<void>;
  isUpdating: any;
}

export const DestopView = ({
  item,
  isEditing,
  editor,
  setIsEditing,
  handleUpdate,
  isUpdating,
}: DestopViewProps) => {
  const [name, setName] = useState(item.name);
  const [address, setAddress] = useState(item.address);
  const [contact, setContact] = useState(item.contact);

  const [openNameModal, setOpenNameModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);

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
                    NameBtn={`${item.name.slice(0, 30)}...`}
                    titleContent="Merchant Name"
                    content={item.name}
                    id={item.name}
                    open={openNameModal}
                    setOpen={setOpenNameModal}
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
                NameBtn={`${item.address.slice(0, 20)}...`}
                content={item.address}
                id={item.address}
                open={openAddressModal}
                setOpen={setOpenAddressModal}
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
            NameBtn="See Product"
            titleContent="Product Serial Number"
            content={productIdUI(item.product)}
            id={item.product}
            open={openProductModal}
            setOpen={setOpenProductModal}
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
