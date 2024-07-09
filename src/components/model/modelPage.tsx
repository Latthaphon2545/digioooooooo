import Link from "next/link";
import StatStatus from "../statStatus";

import { FaEdit } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

interface Model {
  series: string;
  information: Record<string, string>;
  status: Record<string, string>;
  image: string;
  product?: Record<string, string>[];
}

interface ModelProps {
  models: Model[];
  edit: boolean;
}

export default function Model({ models, edit }: ModelProps) {
  return (
    <>
      <div className="flex gap-5 flex-col justify-center mt-3 pb-5">
        {models.map((model, index) => (
          <div
            key={index}
            className="card card-side bg-base-100 shadow-xl mx-auto w-[80%] h-[30vh]"
            id={model.series}
          >
            <figure>
              <img
                src={model.image}
                alt="Model"
                className="h-[30vh] w-[20vw] mobile:hidden tablet:block laptop:block"
              />
            </figure>
            <div className="card-body">
              <div className="card-title gap-3">
                {/* <Modal
                title="Info"
                titleContent={model.series}
                content={model.information.description}
              /> */}
                <h2>{model.series}</h2>
                <button
                  disabled={!edit}
                  className={`${edit ? "" : "cursor-not-allowed"}`}
                >
                  <FaEdit color={`${edit ? "black" : "gray"}`} />
                </button>
              </div>
              {StatStatus(model.status)}
              <div className="card-actions justify-end mt-3">
                <Link
                  href={`/products?filter=${model.series}&search=&skip=0&take=8`}
                >
                  <button className="btn btn-primary">Watch</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="mobile:hidden tablet:hidden laptop:block">
          <div
            className="card card-side bg-base-200 bg-opacity-40 shadow-xl mx-auto flex flex-col justify-center items-center gap-5 w-[80%] h-[30vh]"
            id="Add Model"
          >
            <div className="text-4xl">
              <IoMdAddCircle />
            </div>
            <div className="text-2xl">Add Model</div>
          </div>
        </div>
      </div>
    </>
  );
}
