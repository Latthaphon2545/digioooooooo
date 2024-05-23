import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  handleSearch,
}: {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [search, setSearch] = useState("");

  const handleDeleate = () => {
    setSearch("");
    handleSearch({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="flex justify-end items-center">
      <label className="input input-sm w-[15vw] input-bordered flex items-center gap-2">
        <FaSearch />
        <input
          type="text"
          className="grow"
          placeholder="Search"
          onChange={(e) => {
            handleSearch(e);
            setSearch(e.target.value);
          }}
          value={search}
        />
        {search && (
          <button className="btn btn-xs btn-ghost" onClick={handleDeleate}>
            X
          </button>
        )}
      </label>
    </div>
  );
}
