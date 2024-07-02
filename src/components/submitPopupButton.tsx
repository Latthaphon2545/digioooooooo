"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

type AlertProps = {
  children: React.ReactNode;
  action?: () => void;
  styles: string;
  header: string;
  description: string | React.ReactNode;
  id: string;
  disabled?: boolean;
  isSubmitting?: boolean;
  confirmString?: string | React.ReactNode;
  confirmStyle?: string;
};

export default function SubmitPopupButton({
  children,
  action,
  styles,
  header,
  description,
  id,
  disabled,
  isSubmitting,
  confirmString,
  confirmStyle,
}: AlertProps) {
  const { pending } = useFormStatus();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <label
        htmlFor={id}
        className={`btn ${styles}`}
        onClick={() => setOpen(!open)}
      >
        {children}
      </label>

      <input type="checkbox" id={id} className={`modal-toggle ${styles}`} />
      <div
        className={`modal laptop:modal-middle tablet:modal-middle mobile:modal-bottom ${
          open ? "modal-open" : ""
        }`}
        role="dialog"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">{header}</h3>
          <div className="py-4">{description}</div>
          <div className="modal-action">
            <label
              htmlFor={id}
              className="btn btn-sm"
              onClick={() => setOpen(!open)}
            >
              Close
            </label>
            <label htmlFor={id}>
              <button
                className={`btn btn-sm ${confirmStyle}`}
                type="submit"
                disabled={disabled || pending}
                onClick={() => {
                  action && action();
                }}
              >
                {pending ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <div>
                    {isSubmitting ? (
                      <div>{children}</div>
                    ) : (
                      <p>{confirmString}</p>
                    )}
                  </div>
                )}
              </button>
            </label>
          </div>
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
    </div>
  );
}
