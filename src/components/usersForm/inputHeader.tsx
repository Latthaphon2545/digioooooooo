"use client";
type inputHeaderProps = {
  icon: React.ReactNode;
  title: string;
  page: "user" | "product" | "merchant" | "model" | "bank";
  activeTab?: number;
  setActiveTab?: React.Dispatch<React.SetStateAction<number>>;
};

const InputHeader = ({ icon, title }: inputHeaderProps) => {
  return (
    <div className="mobile:hidden laptop:block">
      <div className="items-center mb-2">
        <div className="flex flex-row justify-start items-center gap-4 mx-5 mt-5 mb-1">
          <div className="text-5xl">{icon}</div>
          <h1 className="text-3xl font-bold text-center">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default InputHeader;
