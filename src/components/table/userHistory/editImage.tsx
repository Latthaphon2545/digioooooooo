import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { IoAddCircleOutline, IoTrashOutline } from "react-icons/io5";

type EditImageProps = {
  oldImageUrls: string[];
};

export default function EditImage({ oldImageUrls }: EditImageProps) {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(oldImageUrls);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newPreviewUrls = images.map((image) => URL.createObjectURL(image));
    setPreviewUrls([...oldImageUrls, ...newPreviewUrls]);
  }, [images, oldImageUrls]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    setImages((prevImages) =>
      prevImages.filter((_, i) => i + oldImageUrls.length !== index)
    );
    setDeleteMode(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center space-x-2">
        <IoAddCircleOutline size={30} onClick={triggerFileInput} />
        {oldImageUrls.length > 0 && (
          <IoTrashOutline size={30} onClick={toggleDeleteMode} />
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />
      {previewUrls.map((url, index) => (
        <div key={index} className="inline-block relative">
          <Image src={url} alt="Preview" width={100} height={100} />
          {deleteMode && (
            <button
              className="absolute top-0 right-0"
              onClick={() => handleDeleteImage(index)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
