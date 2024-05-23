import { useEffect } from "react";
import { GrDown } from "react-icons/gr";

interface IHistoryProductEdit {
  data: {
    [key: string]: any;
  }[];
}

export default function HistoryProductEdit({ data }: IHistoryProductEdit) {
  const openModal = () => {
    const modal = document.getElementById("edit") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
      console.log(data);
    }
  };

  return (
    <>
      <button className="btn btn-info" onClick={openModal}>
        Edit
      </button>
      <dialog id="edit" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit</h3>
          <form className="flex flex-col justify-center items-center gap-3">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24 w-96"
                placeholder={data[0].description}
              ></textarea>
            </label>
            {/*  */}
            {dropdown()}
            <div className="flex justify-center gap-3">
              <button
                className="btn btn-error"
                type="submit"
                onClick={() => {}}
              >
                cancel
              </button>
              <button className="btn btn-primary" type="submit">
                submit
              </button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog"></form>
          </div>
        </div>
      </dialog>
    </>
  );
}

const dropdown = () => {
  return (
    <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
      <li>
        <a>Item 1</a>
      </li>
      <li>
        <a>Item 2</a>
      </li>
      <li>
        <a>Item 3</a>
      </li>
    </ul>
  );
};
