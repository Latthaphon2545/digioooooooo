import React, { useEffect, useState } from "react";
import { MdImageSearch } from "react-icons/md";
import Modal from "../../modal";
import { TbHttpDelete } from "react-icons/tb";
import SubmitPopupButton from "@/components/submitPopupButton";
import { FaRegEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";

const ViewImg = ({
  id,
  image,
  editing = false,
  setImage,
  setImageToDelete,
  triggerFileInput,
  imageToDelete,
}: {
  id: string;
  image: string[];
  editing?: boolean;
  setImage?: (index: number) => void;
  setImageToDelete?: React.Dispatch<React.SetStateAction<string[]>>;
  inputRef?: React.RefObject<HTMLInputElement>;
  triggerFileInput?: () => void;
  imageToDelete?: string[];
}) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImages(image);
  }, [image]);

  const handleDeleteImage = (index: number) => {
    const deletedImage = images[index];
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    if (setImage) {
      setImage(index);
    }
    if (
      setImageToDelete &&
      index < image.length &&
      !deletedImage.startsWith("blob:") &&
      !imageToDelete?.includes(deletedImage)
    ) {
      console.log("deletedImage", deletedImage);

      setImageToDelete((prev) => [...prev, deletedImage]);
    }
  };

  const imageShow = (images: string[] | undefined) => {
    return (
      <>
        <div className="carousel w-full">
          {images &&
            images.map((item, index) => (
              <div
                key={index}
                id={`item${index + 1}`}
                className="carousel-item w-full justify-center relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item}
                  className="w-[50vw] h-[30vh]"
                  alt={`carousel item ${index + 1}`}
                />
                {editing && (
                  <SubmitPopupButton
                    header="Delete Image?"
                    description="Are you sure you want to delete this image?"
                    styles="absolute -top-2 -right-2  bg-base-100 btn-circle"
                    id={`deleteImage-${index}`}
                    action={() => handleDeleteImage(index)}
                    confirmString="Delete"
                  >
                    <TbHttpDelete size={30} className="text-error" />
                  </SubmitPopupButton>
                )}
              </div>
            ))}
        </div>

        {images && images.length > 1 && (
          <div className="block  relative overflow-hidden">
            <div className="flex justify-between gap-10">
              <span className="animate-bounce-x2 inline-block">
                {"<<<<<<<<"}
              </span>
              <span>Swipe to see more</span>
              <span className="animate-bounce-x1 inline-block">
                {">>>>>>>>"}
              </span>
            </div>
          </div>
        )}
        {editing && (
          <div className="carousel-item w-full h-full flex items-center justify-center">
            <IoAddCircleOutline onClick={triggerFileInput} size={40} />
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <Modal
        title={
          <div className="flex items-center space-x-2">
            {!editing ? <MdImageSearch size={20} /> : <FaRegEdit size={20} />}
          </div>
        }
        titleContent="Image Prov."
        content={imageShow(images)}
        id={id}
        style={images && images.length > 0 ? "" : "btn-disabled"}
        boolClose={true}
      />
    </>
  );
};

export default ViewImg;
