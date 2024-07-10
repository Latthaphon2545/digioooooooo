import { ConvertTime } from "@/components/dateTime";
import { stringToHex } from "@/lib/generateRandomHref";
import Link from "next/link";
import React, { useState } from "react";
import { ColorProductStatus } from "../../color";
import { ConvertStatus } from "@/components/convertStatusAndRole";
import ViewImg from "../../historyProduct/view/historyProductViewImg";
import SubmitPopupButton from "@/components/submitPopupButton";
import Modal from "@/components/modal";
import { TbUserEdit } from "react-icons/tb";
import { DropdownProduct } from "../../DropdownStatusProduct";
import EditImage from "../editImage";
import { EditableField } from "@/components/editableField";

interface UserHistoryMobileViewProps {
  item: any;

  handleUpdateUserHistory: (
    id: string,
    history: { description: string; category: string; imageProves: File[] },
    imageToDelete: string[]
  ) => Promise<void>;
}

export default function UserHistoryMobileView({
  item,
  handleUpdateUserHistory,
}: UserHistoryMobileViewProps) {
  const [openEditModal, setOpenEditModal] = useState(false);

  const { formattedDate } = ConvertTime(item.createdAt);

  return (
    <div className="mt-3 card bg-base-100 w-96 shadow-xl ">
      <div className="card-body">
        <div className="card-actions flex justify-end">
          <Modal
            title={
              <>
                <TbUserEdit size={20} /> Edit
              </>
            }
            titleContent=""
            style="btn-info btn-sm"
            id={`editUserHistory${item.id}`}
            content={ModalEdit({ item, handleUpdate: handleUpdateUserHistory })}
            action={() => {
              setOpenEditModal(!openEditModal);
            }}
            boolClose={false}
          />
        </div>
        <div className="card-title flex justify-between">
          <Link
            href={`/products/history/${stringToHex(
              item.product.serialNumber
            )}?skip=0&take=7`}
            className="link link-primary"
          >
            {item.product.serialNumber.slice(0, 6) + "XXXX"}
          </Link>
          <div>
            <h2 className="text-sm">{formattedDate}</h2>
          </div>
        </div>
        <p>{item.description}</p>
        <div className="flex justify-between">
          <div
            className={`badge badge-${ColorProductStatus(
              ConvertStatus(item.category)
            )} badge-outline badge-md`}
          >
            <p>{ConvertStatus(item.category)}</p>
          </div>
          <ViewImg id={item.id} image={item.imageProve} />
        </div>
      </div>
    </div>
  );
}

interface ModalEditMobileUserProps {
  item: any;
  handleUpdate: any;
}

const ModalEdit = ({ item, handleUpdate }: ModalEditMobileUserProps) => {
  const [description, setDescription] = useState(item?.description || "");
  const [status, setStatus] = useState(item?.category || "");
  const [imageProves, setImageProves] = useState<File[]>([]);
  const [imageToDelete, setImageToDelete] = useState<string[]>([]);

  const [isLoad, setIsLoad] = useState(false);

  return (
    <div className="px-5 flex flex-col gap-5 items-center">
      <div className="w-full">
        <p className="text-gray-500">Description</p>
        <EditableField
          defaultValue={description}
          onChange={setDescription}
          name="description"
          tooltip="Enter a description"
        />
      </div>
      <div className="w-full ">
        <p className="text-gray-500">Status</p>
        <DropdownProduct selected={status} onChange={setStatus} />
      </div>
      <div className="w-full ">
        <p className="text-gray-500">ImageProve</p>
        <EditImage
          oldImageUrls={item.imageProve}
          images={imageProves}
          setImages={setImageProves}
          setImageToDelete={setImageToDelete}
          imageToDelete={imageToDelete}
          mobileImg={true}
        />
      </div>

      <SubmitPopupButton
        action={async () => {
          setIsLoad(true);
          await handleUpdate(item.id, {
            description,
            category: status,
            imageProves,
          });
          const modal = document.getElementById(`editUserHistory${item.id}`);
          const checkbox = modal?.nextElementSibling as HTMLInputElement;
          checkbox.checked = false;
          setIsLoad(false);
        }}
        styles="btn-xl btn-primary"
        confirmString={
          isLoad ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Update"
          )
        }
        confirmStyle="btn-success btn-sm"
        header="Are you sure you want to update this user history?"
        description={""}
        id={`editUserHistory${item.id}`}
      >
        Confirm
      </SubmitPopupButton>
    </div>
  );
};
