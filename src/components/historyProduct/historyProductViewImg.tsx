import React from "react";
import { MdImageSearch } from "react-icons/md";

const ViewImg = () => {
  const image = [
    "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg",
    "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg",
    "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg",
    "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg",
  ];

  const imageShow = (images: string[] | undefined) => {
    return (
      <>
        <div className="carousel w-full">
          {images &&
            images.map((item, index) => (
              <div
                key={index}
                id={`item${index + 1}`}
                className="carousel-item w-full"
              >
                <img
                  src={item}
                  className="w-full"
                  alt={`carousel item ${index + 1}`}
                />
              </div>
            ))}
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
          {images &&
            images.map((_, index) => (
              <a key={index} href={`#item${index + 1}`} className="btn btn-xs">
                {index + 1}
              </a>
            ))}
        </div>
      </>
    );
  };

  const openModal = () => {
    const modal = document.getElementById("my_modal_5") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <button className="btn" onClick={openModal}>
        <MdImageSearch size={20} />
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Images</h3>
          <div className="modal-action">
            <form method="dialog">
              {imageShow(image)}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ViewImg;
