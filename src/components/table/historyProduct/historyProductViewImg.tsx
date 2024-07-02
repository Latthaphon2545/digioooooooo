import React, { useState } from "react";
import { MdImageSearch, MdDelete } from "react-icons/md"; // Import MdDelete for the delete icon
import Modal from "../../modal";

const ViewImg = ({
  id,
  image,
  editing = false,
}: {
  id: string;
  image: string[];
  editing?: boolean;
  setOldImages?: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [images, setImages] = useState<string[]>(image);

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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
                <img
                  src={item}
                  className="w-[50vw] h-[30vh]"
                  alt={`carousel item ${index + 1}`}
                />
                {editing && (
                  <button
                    className="absolute top-0 right-0 p-2"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <MdDelete size={24} />
                  </button>
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
      </>
    );
  };

  return (
    <>
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <MdImageSearch size={20} />
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
