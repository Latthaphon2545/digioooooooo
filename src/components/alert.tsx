"use client";
import React from "react";

type AlertProps = {
  children: React.ReactNode;
  action?: () => void;
  styles: string;
  alertHeader: string;
  alertDescroption: string;
  id: string;
  disabled?: boolean;
};

const Alert = ({
  children,
  action,
  styles,
  alertHeader,
  alertDescroption,
  id,
  disabled,
}: AlertProps) => {
  return (
    <div>
      <button
        disabled={disabled}
        className={`btn ${styles}`}
        onClick={() =>
          (document.getElementById(id) as HTMLDialogElement)?.showModal()
        }
      >
        {children}
      </button>
      <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{alertHeader}</h3>
          <p className="py-4">{alertDescroption}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-5">Close</button>
              <button type="submit" className="btn" onClick={action}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Alert;
