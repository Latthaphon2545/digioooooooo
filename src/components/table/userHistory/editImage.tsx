import React, { useState, useEffect, useRef } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import ViewImg from "../historyProduct/view/historyProductViewImg";

type EditImageProps = {
  oldImageUrls: string[];
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  setImageToDelete?: React.Dispatch<React.SetStateAction<string[]>>;
  imageToDelete: string[];
  mobileImg?: boolean;
};

export default function EditImage({
  oldImageUrls,
  images,
  setImages,
  setImageToDelete,
  imageToDelete,
  mobileImg,
}: EditImageProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newImagePreviews = images.map((file) => URL.createObjectURL(file));
    setPreviewUrls(newImagePreviews);

    return () => {
      newImagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleDeleteImage = (index: number) => {
    if (index < oldImageUrls.length) {
      if (setImageToDelete) {
        setImageToDelete((prev) => [...prev, oldImageUrls[index]]);
      }
      oldImageUrls.splice(index, 1);
    } else {
      setImages((prevImages) =>
        prevImages.filter((_, i) => i !== index - oldImageUrls.length)
      );
      setPreviewUrls((prevUrls) =>
        prevUrls.filter((_, i) => i !== index - oldImageUrls.length)
      );
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center space-x-2">
        {oldImageUrls.length === 0 && images.length === 0 && (
          <IoAddCircleOutline size={26} onClick={triggerFileInput} />
        )}
        {(oldImageUrls.length > 0 || images.length > 0) && (
          <ViewImg
            id="editImg"
            image={[...oldImageUrls, ...previewUrls]}
            setImage={handleDeleteImage}
            editing={true}
            setImageToDelete={setImageToDelete}
            inputRef={fileInputRef}
            triggerFileInput={triggerFileInput}
            imageToDelete={imageToDelete}
            mobileImg={mobileImg}
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
