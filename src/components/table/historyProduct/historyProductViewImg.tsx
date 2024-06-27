"use client";

import React from "react";
import { MdImageSearch } from "react-icons/md";
import Modal from "../../modal";

const ViewImg = ({ id, image }: { id: string; image: any }) => {
  const imageShow = (images: string[] | undefined) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    return (
      <>
        <div className="carousel w-full">
          {images &&
            images.map((item, index) => (
              <div
                key={index}
                id={`item${index + 1}`}
                className="carousel-item w-full justify-center"
              >
                <img
                  src={item}
                  className="w-[50vw] h-[30vh]"
                  alt={`carousel item ${index + 1}`}
                />
              </div>
            ))}
        </div>

        {images && images.length > 1 && (
          <div className="block  relative overflow-hidden">
            <div className="flex justify-between gap-10">
              <span className="animate-bounce-x2 inline-block">
                {"<<<<<<<<"}
              </span>
              <span>Slice to see more</span>
              <span className="animate-bounce-x1 inline-block">
                {">>>>>>>>"}
              </span>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <Modal
        title={<MdImageSearch size={20} />}
        titleContent="Image Prov."
        content={imageShow(image)}
        id={id}
        style={image && image.length > 0 ? "" : "btn-disabled"}
        boolClose={true}
      />
    </>
  );
};

export default ViewImg;
