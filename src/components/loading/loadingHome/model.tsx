import { TbBuildingWarehouse } from "react-icons/tb";
import { RiUninstallLine } from "react-icons/ri";

const item = 6;

const ModelHomeLoading = () => {
  return (
    <div className={`grid grid-cols-2 gap-5 rounded-lg overflow-x-auto p-10`}>
      {Array.from({ length: item }).map((_, index) => (
        <div key={index} className="stats shadow-xl ">
          <div className="stat">
            <div className="stat-figure text-green-500">
              <TbBuildingWarehouse size={40} />
            </div>
            <div className="stat-title">In Stock</div>
            <div className="stat-value skeleton opacity-25 h-8">{}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-primary">
              <RiUninstallLine size={40} />
            </div>
            <div className="stat-title">Installings</div>
            <div className="stat-value skeleton h-8 opacity-25">{}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar">
                <div className="w-16 skeleton h-16 opacity-25 rounded-full shrink-0"></div>
              </div>
            </div>
            <div className="stat-value skeleton opacity-25 h-6 mb-1"></div>
            <div className="stat-title btn btn-xs">View Model</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModelHomeLoading;
