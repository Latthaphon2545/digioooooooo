import Link from "next/link";
import Modal from "../modal";
import stat from "./statModel";

interface Model {
  series: string;
  information: Record<string, string>;
  status: Record<string, string>;
  image: string;
}

interface ModelProps {
  models: Model[];
}

export default function Model({ models }: ModelProps) {
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
            </div>
            {stat(model.status)}
            <div className="card-actions justify-end mt-3">
              <Link
                href={`/products/list?filter=${model.series}&search=&skip=0&take=8`}
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
