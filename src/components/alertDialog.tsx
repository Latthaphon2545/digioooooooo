import React, { useEffect } from "react";
import { ShowAlert } from "./showAlert";

interface AlertDialogProps {
  alertTitle: string;
  styles: string;
  icon?: React.ReactNode;
  open: boolean;
  id: string;
  setAlertTitle: (value: string) => void;
  setAlertStyles: (value: string) => void;
  setAlertIcon: (value: React.ReactNode) => void;
  setShowAlert: (value: boolean) => void;
}

export default function AlertDialog({
  alertTitle,
  styles,
  icon,
  open,
  id,
  setAlertTitle,
  setAlertStyles,
  setAlertIcon,
  setShowAlert,
}: AlertDialogProps) {
  useEffect(() => {
    if (alertTitle) {
      setShowAlert(true);
      setAlertTitle(alertTitle);
      setAlertStyles(styles);
      setAlertIcon(icon);
      setTimeout(() => setShowAlert(false), 3000);
    }
  }, [alertTitle]);
  return (
    <>
      {open && (
        <div className="fixed bottom-4 left-[15%] w-[20%]">
          <div
            role="alert"
            className={`alert ${styles} fixed bottom-4 left-[15%] mobile:hidden tablet:hidden laptop:flex desktop:flex w-fit`}
          >
            {icon}
            <span>{alertTitle}</span>
          </div>

          <dialog
            id={id}
            className={`modal modal-bottom mobile:flex tablet:flex laptop:hidden desktop:hidden`}
          >
            <div className={`modal-box ${styles}`}>
              <h3 className="font-bold text-lg flex items-center justify-center gap-5 ">
                {icon} {alertTitle}
              </h3>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}

export const Info = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="stroke-current shrink-0 w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

export const Success = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-current shrink-0 h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const Error = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-current shrink-0 h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const Warning = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-current shrink-0 h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

export const I = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="stroke-gray-300 shrink-0 w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

export const ErrorStyle = "alert-error mobile:bg-error tablet:bg-error";

export const SuccessStyle = "alert-success mobile:bg-success tablet:bg-success";

export const WarningStyle = "alert-warning mobile:bg-warning tablet:bg-warning";
