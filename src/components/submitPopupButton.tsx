"use client";

import { useFormStatus } from "react-dom";

type AlertProps = {
  children: React.ReactNode;
  action?: () => void;
  styles: string;
  header: string;
  description: string;
  id: string;
  disabled?: boolean;
  isSubmitting?: boolean;
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
}: AlertProps) {
  const { pending } = useFormStatus();
  return (
    <div>
      <label htmlFor={id} className={`btn ${styles}`}>
        {children}
      </label>

      <input type="checkbox" id={id} className={`modal-toggle ${styles}`} />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{header}</h3>
          <p className="py-4">{description}</p>
          <div className="modal-action">
            <label htmlFor={id} className="btn">
              Close
            </label>
            <label htmlFor={id}>
              <button
                className="btn"
                type="submit"
                disabled={disabled || pending}
                onClick={() => {
                  action && action();
                }}
              >
                {pending ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>{isSubmitting ? <p>{children}</p> : <p>Confirm</p>}</>
                )}
              </button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
