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
    <div className="stats shadow-xl ">
      <div className="stat">
        <div className="stat-figure text-green-500">
          <TbBuildingWarehouse size={40} />
        </div>
        <div className="stat-title">In Stock</div>
        <div className="stat-value text-green-500">{instock}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-primary">
          <RiUninstallLine size={40} />
        </div>
        <div className="stat-title">Installings</div>
        <div className="stat-value text-primary">{installing}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src={image} alt={series} />
            </div>
          </div>
        </div>
        <div className="stat-value text-xl">{series}</div>
        <button
          className="stat-title btn btn-xs"
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
