import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  handleSearch,
}: {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = () => {
    setSearch("");
    handleSearch({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDelete();
      } else if (e.metaKey && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex justify-end items-center">
      <label className="input input-sm w-64 input-bordered flex items-center gap-2">
        <FaSearch />
        <input
          ref={searchInputRef}
          type="text"
          className="grow"
          placeholder="Search"
          onChange={(e) => {
            handleSearch(e);
            setSearch(e.target.value);
          }}
          value={search}
        />
        {search ? (
          <div>
            <kbd className="mobile:hidden tablet:hidden laptop:block kbd kbd-xs bg-transparent">
              ESC
            </kbd>
            <kbd
              className="mobile:block tablet:block laptop:hidden kbd kbd-xs bg-transparent"
              onClick={handleDelete}
            >
              X
            </kbd>
          </div>
        ) : (
          <div className="mobile:hidden laptop:flex gap-2">
            <kbd className="kbd kbd-xs bg-transparent">⌘</kbd>
            <kbd className="kbd kbd-xs bg-transparent">K</kbd>
          </div>
        )}
      </label>
    </div>
  );
}
