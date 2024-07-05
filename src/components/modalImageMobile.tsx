"use client";

import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

interface ModalImageMobileProps {
  title: React.ReactNode;
  titleContent?: string;
  content?: React.ReactNode;
  style?: string;
  id: string;
  boolClose?: boolean;
  action?: () => void;
}

const ModalImageMobile = ({
  title,
  titleContent,
  content,
  style,
  id,
  boolClose,
  action,
}: ModalImageMobileProps) => {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <label
        htmlFor={id}
        className={`btn btn-xs ${style}`}
        onClick={() => {
          setOpen(!open);
          if (action) {
            action();
          }
        }}
      >
        {title}
      </label>

      <input type="checkbox" id={id} className="modal-toggle" />
      <div
        className={`modal modal-middle  w-full h-full  ${
          open ? "modal-open" : ""
        }`}
        role="dialog"
      >
        <div className="modal-box p-8">
          {boolClose && (
            <label
              htmlFor={id}
              className="btn btn-xs btn-circle btn-error absolute right-4 top-2"
              onClick={() => setOpen(!open)}
            >
              X
            </label>
          )}
          <h3 className="text-lg font-bold">{titleContent}</h3>
          <div className="text-sm text-start">{content}</div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor={id}
          onClick={() => {
            setOpen(!open);
          }}
        >
          Close
        </label>
      </div>
    </React.Fragment>
  );
};

export default ModalImageMobile;
