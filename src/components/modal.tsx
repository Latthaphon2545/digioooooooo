"use client";

import React, { useState } from "react";

interface ModalProps {
  title: React.ReactNode;
  titleContent?: string;
  content?: React.ReactNode;
  style?: string;
  id: string;
  boolClose?: boolean;
  action?: () => void;
}

const Modal = ({
  title,
  titleContent,
  content,
  style,
  id,
  boolClose,
  action,
}: ModalProps) => {
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
        className={`modal laptop:modal-middle tablet:modal-middle mobile:modal-bottom ${
          open ? "modal-open" : ""
        }`}
        role="dialog"
      >
        <div className="modal-box">
          {boolClose && (
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setOpen(!open)}
            >
              ✕
            </button>
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

export default Modal;
