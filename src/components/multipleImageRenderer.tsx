import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

export default function MultipleImageRenderer() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageUrls = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages(imageUrls);
    }
  };
  return (
    <div className="flex flex-row items-center space-x-3">
      {selectedImages.map((image, index) => (
        <div key={index}>
          <label
            htmlFor={`my_modal_${index}`}
            className="btn btn-primary btn-sm"
          >
            <IoEyeOutline size={30} />
          </label>

          {/* Put this part before </body> tag */}
          <input
            type="checkbox"
            id={`my_modal_${index}`}
            className="modal-toggle"
          />
          <div className="modal" role="dialog">
            <div className="modal-box w-full h-full">
              <Image src={image} alt={`Image ${index}`} layout="fill" />
            </div>
            <label className="modal-backdrop" htmlFor={`my_modal_${index}`}>
              <IoEyeOutline />
            </label>
          </div>
        </div>
      ))}
      <input
        type="file"
        accept="image/*"
        id="image"
        name="image"
        multiple
        onChange={handleImageChange}
        className="file-input file-input-sm file-input-bordered file-input-primary w-full max-w-xs"
      />
    </div>
  );
}
