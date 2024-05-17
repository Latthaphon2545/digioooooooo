import React from "react";

type AlertProps = {
  children: React.ReactNode;
  action?: () => void;
  styles: string;
  alertHeader: string;
  alertDescroption: string;
};

const Alert = ({
  children,
  action,
  styles,
  alertHeader,
  alertDescroption,
}: AlertProps) => {
  return (
    <div>
      <button
        className={`btn ${styles}`}
        onClick={() =>
          (
            document.getElementById("my_modal_5") as HTMLDialogElement
          )?.showModal()
        }
      >
        {children}
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{alertHeader}</h3>
          <p className="py-4">{alertDescroption}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-5">Close</button>
              <button className="btn" onClick={action}>
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
