import Link from "next/link";
import Modal from "../modal";
import StatStatus from "../statStatus";

import { FaEdit } from "react-icons/fa";

interface Model {
  series: string;
  information: Record<string, string>;
  status: Record<string, string>;
  image: string;
}

interface ModelProps {
  models: Model[];
  edit: boolean;
}

export default function Model({ models, edit }: ModelProps) {
  return (
    <div className="flex flex-wrap justify-center">
      {models.map((model, index) => (
        <div
          key={index}
          className="card card-side bg-base-100 shadow-xl mx-20 mt-5"
        >
          <figure>
            <img src={model.image} alt="Model" className="h-[25vh] w-[20vw]" />
          </figure>
          <div className="card-body">
            <div className="card-title gap-3">
              <Modal
                title="Info"
                titleContent={model.series}
                content={model.information.description}
              />
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
    </div>
  );
}
