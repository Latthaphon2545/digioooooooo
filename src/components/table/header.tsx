import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBar from "./searchBar";

export default function Header({}) {
  const router = useRouter();

  const filterParams = useSearchParams().get("filter");
  const filterParamsArray = filterParams ? filterParams.split(",") : [];
  const filterParamsObjects = filterParamsArray.map((param) => ({
    value: param,
  }));

  if (filterParamsObjects.length === 0) {
    filterParamsObjects.push({ value: "All" });
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        {filterParamsObjects.map((param) => (
          <div key={param.value} className="badge badge-outline badge-lg mr-3 px-4 py-3 text-sm font-bold">
            {param.value}
          </div>
        ))}
      </div>
      <SearchBar />
    </div>
  );
}
