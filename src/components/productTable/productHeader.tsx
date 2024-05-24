import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBar from "./productSearch";
import DropdownBottom from "./productFillter";

const CATEGORIES = [
  {
    title: "User",
    list: [
      {
        title: "Status",
        names: [
          { name: "Installed", action: () => {} },
          { name: "In Stock", action: () => {} },
          { name: "Damaged", action: () => {} },
          { name: "Repairing", action: () => {} },
          { name: "Waiting for Repair", action: () => {} },
        ],
      },
      {
        title: "Models",
        names: [{ name: "xxxx", action: () => {} }],
      },
    ],
  },
];

export default function Header({}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const filterParams = params.get("filter");
  const skipParams = params.get("skip");
  const takeParams = params.get("take");

  const filterParamsArray = filterParams ? filterParams.split(",") : [];
  const filterParamsObjects = filterParamsArray.map((param) => ({
    value: param,
  }));

  if (filterParamsObjects.length === 0) {
    filterParamsObjects.push({ value: "All" });
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(
      `${pathname}?filter=${filterParamsArray.join(",")}&search=${
        e.target.value
      }&skip=${skipParams}&take=${takeParams}`
    );
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center">
        <SearchBar handleSearch={handleSearch} />
        {CATEGORIES.map((item, index) => (
          <DropdownBottom key={index} item={item} index={index} />
        ))}
      </div>
      <div>
        {filterParamsObjects.map((param) => (
          <div
            key={param.value}
            className="badge badge-outline badge-lg mr-3 px-4 py-3 text-sm font-bold gap-2"
          >
            <p>{param.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
