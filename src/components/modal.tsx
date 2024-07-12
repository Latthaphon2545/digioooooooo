"use client";

import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

interface ModalProps {
  NameBtn: React.ReactNode | string;
  styleBtn?: string;
  titleContent?: string;
  content?: React.ReactNode;
  id: string;
  action?: () => void;
  mobileImg?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Modal = ({
  NameBtn: title,
  titleContent,
  content,
  styleBtn: style,
  id,
  action,
  mobileImg,
  open,
  setOpen,
}: ModalProps) => {
  const handleOpen = () => {
    setOpen(!open);
    if (action) action();
  };

  const hansleClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <button className={`btn btn-xs ${style}`} onClick={handleOpen}>
        {title}
      </button>

      <input
        type="checkbox"
        id={id}
        className="modal-toggle"
        checked={open}
        readOnly
      />
      <div
        className={`modal laptop:modal-middle tablet:modal-middle mobile:modal-bottom ${
          mobileImg && "w-full h-full"
        }`}
        role="dialog"
      >
        <div className="modal-box p-8">
          <label
            htmlFor={id}
            className="btn btn-xs btn-circle btn-error absolute right-4 top-2"
            onClick={hansleClose}
          >
            <IoMdCloseCircle size={20} />
          </label>

          <h3 className="text-lg font-bold">{titleContent}</h3>
          <div className="text-sm text-start max-h-[70vh] overflow-y-auto">
            {content}
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={id} onClick={hansleClose}>
          Close
        </label>
      </div>
    </>
  );
};

export default Modal;
