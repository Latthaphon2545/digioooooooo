import React, { useState, useTransition } from "react";
import { TbUserEdit } from "react-icons/tb";
import Modal from "@/components/modal";
import Link from "next/link";
import { ConvertTime } from "@/components/dateTime";
import { EditableField } from "../EditableField";
import { DropdownProduct } from "../DropdownStatusProduct";
import { ColorProductStatus } from "../color";
import { ConvertStatus } from "@/components/convertStatusAndRole";
import { stringToHex } from "@/lib/generateRandomHref";
import ViewImg from "../historyProduct/historyProductViewImg";
import ActionButton from "@/components/actionButton";
import { handleEditToggle } from "../handleEditToggle";

import SubmitPopupButton from "@/components/submitPopupButton";
import EditImage from "./editImage";
import { updateUserHistoryOnServer } from "./action/serverUpdate";

interface TableRowProps {
  item: any;
  isEditor: boolean;
  isEditing: { [key: string]: boolean };
  setIsEditing: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  handleUpdateUserHistory: (
    id: string,
    history: { description: string; category: string; imageProves: File[] },
    imageToDelete: string[]
  ) => Promise<void>;
}

const TableRow: React.FC<TableRowProps> = ({
  item,
  isEditor,
  isEditing,
  setIsEditing,
  handleUpdateUserHistory,
}) => {
  const { formattedDate, displayTime } = ConvertTime(item.createdAt);
  const [description, setDescription] = useState(item.description);
  const [oldImages, setOldImages] = useState(item.imageProve);
  const [imageToDelete, setImageToDelete] = useState<string[]>([]);
  const [status, setStatus] = useState(item.category);
  const [images, setImages] = useState<File[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <tr key={item.id}>
      <td>
        <h2 className="text-sm">{formattedDate}</h2>
        <h3 className="text-sm">{displayTime}</h3>
      </td>
      <td>
        {isEditing[item.id] ? (
          <EditableField
            defaultValue={description}
            onChange={setDescription}
            name="description"
          />
        ) : item.description.length > 20 ? (
          <Modal
            title={`${item.description.slice(0, 20)}...`}
            titleContent="Description"
            content={item.description}
            id={`editRow-${item.id}`}
          />
        ) : (
          item.description
        )}
      </td>
      <td className={`py-2 px-4 h-[8vh]`}>
        {isEditing[item.id] ? (
          <DropdownProduct
            selected={status}
            onChange={setStatus}
            name="category"
          />
        ) : (
          <span
            className={`badge badge-${ColorProductStatus(
              ConvertStatus(item.category)
            )} badge-outline badge-md`}
          >
            {ConvertStatus(item.category)}
          </span>
        )}
      </td>
      <td className="link link-primary">
        <Link
          href={`/products/history/${stringToHex(
            item.product.serialNumber
          )}?skip=0&take=7`}
          replace
        >
          {item.product.serialNumber.slice(0, 6) + "XXXX"}
        </Link>
      </td>
      <td>
        {isEditing[item.id] ? (
          <EditImage
            oldImageUrls={item.imageProve}
            images={images}
            setImages={setImages}
            setImageToDelete={setImageToDelete}
            imageToDelete={imageToDelete}
          />
        ) : (
          <ViewImg id={`viewImg-${item.id}`} image={oldImages} />
        )}
      </td>
      <td className={`py-2 px-4 ${isEditing ? "" : "cursor-not-allowed"}`}>
        {isEditing[item.id] ? (
          <div className="flex gap-1 justify-center">
            <ActionButton
              action={() => handleEditToggle(item.id, setIsEditing)}
              styles="btn-error btn-sm"
            >
              Cancel
            </ActionButton>
            <SubmitPopupButton
              action={async () => {
                setIsUpdating(true);
                await handleUpdateUserHistory(
                  item.id,
                  {
                    description,
                    category: status,
                    imageProves: images,
                  },
                  imageToDelete
                );
              }}
              // action={() => {
              //   startTransition(() => {
              //     updateUserHistoryOnServer(
              //       item.id,
              //       description,
              //       status,
              //       images
              //     );
              //   });
              // }}
              styles="btn-success btn-sm"
              confirmString={"Update"}
              isSubmitting={isUpdating}
              confirmStyle="btn-success btn-sm"
              header="Are you sure you want to update this user?"
              description={
                <div>
                  <p>
                    Description <span className="font-bold">{description}</span>
                  </p>
                  <p>
                    Status{" "}
                    <span className="font-bold">{ConvertStatus(status)}</span>
                  </p>
                  <p>
                    Image{" "}
                    <span className="font-bold">
                      {images.length > 0 ? "Updated" : "Not updated"}
                    </span>
                  </p>
                </div>
              }
              id={`update-${item.id}`}
            >
              Update
            </SubmitPopupButton>
          </div>
        ) : (
          <ActionButton
            action={() => handleEditToggle(item.id, setIsEditing)}
            styles="btn-info btn-sm"
            disabled={!isEditor}
          >
            <TbUserEdit size={20} /> Edit
          </ActionButton>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
