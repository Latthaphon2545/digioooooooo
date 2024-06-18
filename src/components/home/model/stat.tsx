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
    <div className="stats stats-vertical laptop:stats-horizontal shadow-xl">
      <div className="stat">
        <div className="stat-figure text-green-500">
          <TbBuildingWarehouse size={40} />
        </div>
        <div className="stat-title mobile:text-xs  laptop:text-base">
          In Stock
        </div>
        <div className="stat-value text-green-500 mobile:text-xl laptop:text-4xl">
          {instock}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-primary">
          <RiUninstallLine size={40} />
        </div>
        <div className="stat-title mobile:text-xs  laptop:text-base">
          Installings
        </div>
        <div className="stat-value text-primary mobile:text-xl laptop:text-4xl">
          {installing}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src={image} alt={series} />
            </div>
          </div>
        </div>
        <div className="stat-value laptop:text-xl mobile:text-sm">{series}</div>
        <button
          className="stat-title btn btn-xs "
          onClick={() => {
            router.push(`/products/models`);
          }}
        >
          View Model
        </button>
      </div>
    </div>
  );
};

export default StatHome;
