import Link from "next/link";

import { IoMdAddCircle } from "react-icons/io";
import { StatStatus } from "../statStatus";
import ModalInfo from "./modalInfo";

interface Model {
  series: string;
  information: Record<string, string>;
  status: Record<string, string>;
  image: string;
  product?: Record<string, string>[];
}

interface ModelProps {
  models: Model[];
  isEditor: boolean;
}

export default function Model({ models, isEditor }: ModelProps) {
  return (
    <>
      <div className="flex gap-5 flex-col justify-center mt-3 pb-5">
        {models.map((model, index) => (
          <div
            key={index}
            className="card card-side bg-base-100 shadow-xl mx-auto w-[80%] h-full"
            id={model.series}
          >
            <figure>
              <img
                src={model.image}
                alt="Model"
                className="h-full w-[20vw] mobile:hidden tablet:block laptop:block"
              />
            </figure>
            <div className="card-body">
              <div className="card-title">
                <ModalInfo
                  information={model.information}
                  series={model.series}
                />
                <h2>{model.series}</h2>
              </div>
              <StatStatus status={model.status} />
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
        {isEditor && (
          <Link
            href={"/products/models/add"}
            className={`mobile:hidden tablet:hidden laptop:block`}
          >
            <div
              className="card card-side bg-base-200 bg-opacity-40 shadow-xl mx-auto flex flex-col justify-center items-center gap-5 w-[80%] h-[30vh]
            hover:bg-opacity-60 cursor-pointer
            "
              id="Add Model"
            >
              <div className="text-4xl">
                <IoMdAddCircle />
              </div>
              <div className="text-2xl">Add Model</div>
            </div>
          </Link>
        )}
      </div>
    </>
  );
}
