import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";
import ViewImg from "../historyProduct/historyProductViewImg";

type EditImageProps = {
  oldImageUrls: string[];
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function EditImage({
  oldImageUrls,
  images,
  setImages,
}: EditImageProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newImagePreviews = images.map((file) => URL.createObjectURL(file));
    setPreviewUrls([...oldImageUrls, ...newImagePreviews]);
  }, [images, oldImageUrls]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const isOldImage = index < oldImageUrls.length;
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    if (!isOldImage) {
      const newIndex = index - oldImageUrls.length;
      setImages((prevImages) => prevImages.filter((_, i) => i !== newIndex));
    }
    setDeleteMode(false);
  };

  const triggerFileInput = () => fileInputRef.current?.click();
  const toggleDeleteMode = () => setDeleteMode(!deleteMode);

  return (
    <div className="relative">
      <div className="flex justify-center items-center space-x-2">
        <IoAddCircleOutline size={30} onClick={triggerFileInput} />
        {(oldImageUrls.length > 0 || images.length > 0) && (
          // <div className="flex justify-center items-center space-x-2">
          //   <p className="text-xl">{previewUrls.length}</p>
          //   <IoTrashOutline size={30} onClick={toggleDeleteMode} />
          // </div>
          <ViewImg
            id="editImg"
            image={[...oldImageUrls, ...previewUrls]}
            editing={true}
          />
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="hidden"
        name="image"
      />
    </div>
  );
}
