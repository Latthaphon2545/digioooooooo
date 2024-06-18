import React from "react";
import StatHome from "./stat";

interface Model {
  series: string;
  information: Record<string, string>;
  status: Record<string, string>;
  image: string;
}

interface ModelProps {
  models: Model[];
}

export default function ModelPage({ models }: ModelProps) {
  return (
    <>
      <div
        className={`grid gap-5 rounded-lg overflow-x-auto p-10 laptop:grid-cols-2`}
      >
        {models.map((model, index) => (
          <React.Fragment key={index}>
            <StatHome
              series={model.series}
              instock={model.status.INSTOCK}
              installing={model.status.INSTALLING}
              image={model.image}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
