"use client";
import React, { useEffect } from "react";

type AlertProps = {
  children: React.ReactNode;
  action?: () => void;
  styles: string;
  alertHeader: string;
  alertDescription: string;
  id: string;
  disabled?: boolean;
  loading: boolean;
};

const Alert = ({
  children,
  action,
  styles,
  alertHeader,
  alertDescription,
  id,
  disabled,
  loading,
}: AlertProps) => {
  const handleSubmit = async () => {
    if (action) {
      action();
    }
  };

  useEffect(() => {
    if (!loading) {
      (document.getElementById(id) as HTMLDialogElement)?.close();
      console.log("closing modal");
      console.log("loading", loading);
    }
  }, [loading, id]);

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
          <p className="py-4">{alertDescription}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-5">Close</button>
              <button
                type="submit"
                className="btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <div className="loading loading-dots loading-xs py-0 max-h-3"></div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Alert;
