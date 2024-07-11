import { TbBuildingWarehouse } from "react-icons/tb";
import { RiUninstallLine } from "react-icons/ri";
import Link from "next/link";
import { ColorProductStatus } from "@/components/table/color";

interface StatProps {
  series: string;
  instock: string;
  installing: string;
  image: string;
}

const StatStatusModel = ({ series, instock, installing, image }: StatProps) => {
  const icon = [
    {
      name: "In stock",
      icon: <TbBuildingWarehouse size={40} />,
      data: instock,
    },
    {
      name: "Installing",
      icon: <RiUninstallLine size={40} />,
      data: installing,
    },
  ];
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
        <Link href={`/products?filter=${series}&search=&skip=0&take=8`}>
          <button className="stat-title btn btn-xs mobile:w-fit">
            View More
          </button>
        </Link>
      </div>

      {icon.map((item, index) => (
        <div className="stat" key={index}>
          <div
            className={`stat-figure text-${ColorProductStatus(
              item.name
            )} mobile:hidden laptop:block tablet:block`}
          >
            {item.icon}
          </div>
          <div className="stat-title mobile:text-xs  laptop:text-base">
            {item.name}
          </div>
          <div
            className={`stat-value text-${ColorProductStatus(
              item.name
            )} mobile:text-2xl laptop:text-4xl`}
          >
            {item.data}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatStatusModel;
