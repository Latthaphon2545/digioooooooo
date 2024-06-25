"use client";
type inputHeaderProps = {
  icon: React.ReactNode;
  title: string;
  page: "user" | "product" | "merchant" | "model" | "bank";
  activeTab?: number;
  setActiveTab?: React.Dispatch<React.SetStateAction<number>>;
};

const InputHeader = ({
  icon,
  title,
  page,
  activeTab,
  setActiveTab,
}: inputHeaderProps) => {
  return (
    <div className="mobile:hidden laptop:block">
      <div className="flex flex-row justify-between items-center mb-2">
        <div className="flex flex-row justify-start items-center gap-4 m-4">
          <div className="text-5xl">{icon}</div>
          <h1 className="text-3xl font-bold text-center">{title}</h1>
        </div>
        <div
          role="tablist"
          className={`tabs tabs-bordered tabs-lg mr-3 ${
            page === "user" || page === "product" || page === "merchant"
              ? "block"
              : "hidden"
          }`}
        >
          <a
            role="tab"
            className={`tab ${
              activeTab === 0 ? "tab-active font-semibold" : ""
            } text-xl`}
            onClick={() => setActiveTab && setActiveTab!(0)}
          >
            Individual
          </a>
          <a
            role="tab"
            className={`tab ${
              activeTab === 1 ? "tab-active font-semibold" : ""
            } text-xl`}
            onClick={() => setActiveTab && setActiveTab(1)}
          >
            Group
          </a>
        </div>
      </div>
    </div>
  );
};

export default InputHeader;
