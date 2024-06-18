import { TbBuildingWarehouse } from "react-icons/tb";
import { RiUninstallLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

interface StatProps {
  series: string;
  instock: string;
  installing: string;
  image: string;
}

const StatHome = ({ series, instock, installing, image }: StatProps) => {
  const router = useRouter();
  return (
    <div className="stats stats-horizontal shadow-xl overflow-hidden">
      <div className="stat laptop:w-52 mobile:w-28 tablet:w-52">
        <div className="stat-figure text-secondary mobile:hidden laptop:block tablet:block">
          <div className="avatar">
            <div className="w-16 h-16 rounded-full">
              <img src={image} alt={series} />
            </div>
          </div>
        </div>
        <div className="stat-value laptop:text-xl mobile:text-sm">{series}</div>
        <button
          className="stat-title btn btn-xs mobile:w-fit"
          onClick={() => {
            router.push(`/products/models`);
          }}
        >
          View More
        </button>
      </div>

      <div className="stat">
        <div className="stat-figure text-green-500  mobile:hidden laptop:block tablet:block">
          <TbBuildingWarehouse size={40} />
        </div>
        <div className="stat-title mobile:text-xs  laptop:text-base">
          In Stock
        </div>
        <div className="stat-value text-green-500 mobile:text-2xl laptop:text-4xl">
          {instock}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-primary mobile:hidden laptop:block tablet:block">
          <RiUninstallLine size={40} />
        </div>
        <div className="stat-title mobile:text-xs laptop:text-base">
          Installings
        </div>
        <div className="stat-value text-primary mobile:text-2xl laptop:text-4xl">
          {installing}
        </div>
      </div>
    </div>
  );
};

export default StatHome;
