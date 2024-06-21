"use client";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import stareLogo from "/public/image/stare.jpeg";

export default function ImageRenderer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    // <div className="flex flex-row items-center space-x-3">
    //   {selectedImage && (
    //     <div>
    //       <label htmlFor="my_modal_7" className="btn btn-primary btn-sm">
    //         <IoEyeOutline size={30} />
    //       </label>

    //       {/* Put this part before </body> tag */}
    //       <input type="checkbox" id="my_modal_7" className="modal-toggle" />
    //       <div className="modal" role="dialog">
    //         <div className="modal-box w-full h-full">
    //           <Image
    //             src={selectedImage}
    //             alt={`${selectedImage}'s photo`}
    //             fill
    //           />
    //         </div>
    //         <label className="modal-backdrop" htmlFor="my_modal_7">
    //           <IoEyeOutline />
    //         </label>
    //       </div>
    //     </div>
    //   )}
    //   <input
    //     type="file"
    //     accept="image/png, image/jpeg"
    //     id="image"
    //     name="image"
    //     onChange={handleImageChange}
    //     className="file-input file-input-sm file-input-bordered file-input-primary w-full max-w-xs"
    //   />
    // </div>

    <div className="flex flex-col items-center space-y-8 h-full m-auto">
      <div className="w-[30vh] h-[30vh] lg:w-[40vh] lg:h-[40vh] border-4 relative">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt={`${selectedImage}'s photo`}
            fill
            objectFit="cover"
            className="w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Image
              src={stareLogo}
              alt={`Mike's photo`}
              width={850}
              height={350}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        id="image"
        name="image"
        onChange={handleImageChange}
        className="file-input file-input-sm file-input-bordered file-input-primary w-full max-w-xs"
      />
    </div>
  );
}
