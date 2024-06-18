import { TbBuildingWarehouse } from "react-icons/tb";
import { RiUninstallLine } from "react-icons/ri";

const item = 6;

const ModelHomeLoading = () => {
  return (
    <div
      className={`grid gap-5 rounded-lg overflow-x-auto p-10 laptop:grid-cols-2`}
    >
      {Array.from({ length: item }).map((_, index) => (
        <div
          key={index}
          className="stats stats-horizontal shadow-xl overflow-hidden "
        >
          <div className="stat laptop:w-52 mobile:w-28 tablet:w-52">
            <div className="stat-figure text-secondary mobile:hidden laptop:block tablet:block">
              <div className="avatar">
                <div className="w-16 skeleton h-16 opacity-25 rounded-full shrink-0"></div>
              </div>
            </div>
            <div className="stat-value skeleton opacity-25 h-6 w-12 mb-1"></div>
            <div className="stat-title btn btn-xs mobile:w-fit">View More</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-green-500 mobile:hidden laptop:block tablet:block">
              <TbBuildingWarehouse size={40} />
            </div>
            <div className="stat-title mobile:text-xs  laptop:text-base">
              In Stock
            </div>
            <div className="stat-value skeleton opacity-25 h-8 w-10">{}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-primary mobile:hidden laptop:block tablet:block">
              <RiUninstallLine size={40} />
            </div>
            <div className="stat-title mobile:text-xs  laptop:text-base">
              Installings
            </div>
            <div className="stat-value skeleton h-8 opacity-25 w-10">{}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModelHomeLoading;
