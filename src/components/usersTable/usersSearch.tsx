import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  handleSearch,
}: {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex justify-end items-center">
      <label className="input input-sm w-[15vw] input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          onChange={handleSearch}
        />
        <FaSearch />
      </label>
    </div>
  );
}
