import React from "react";

type InputHeaderProps = {
  icon: React.ReactNode;
  title: string;
};

export default function ServerSideInputHeader({
  icon,
  title,
}: InputHeaderProps) {
  return (
    <div className="flex flex-row items-center space-x-5">
      {icon}
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
}
