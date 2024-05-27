import React from "react";

interface ModalProps {
  title: string;
  titleContent: string;
  content: string;
}

const Modal = ({ title, titleContent, content }: ModalProps) => {
  return (
    <React.Fragment>
      <label htmlFor="my_modal_7" className="btn btn-xs">
        {title}
      </label>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{titleContent}</h3>
          <p className="py-4 text-sm text-start">{content}</p>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </React.Fragment>
  );
};

export default Modal;
