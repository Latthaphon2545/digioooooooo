import React from "react";

interface ContainerProps {
  AlertDialog: any;
  title: string;
  BtnAction: any;
  FloatingActionButton: any;
  Information: any;
}

export default function Container({
  AlertDialog,
  title,
  BtnAction,
  FloatingActionButton,
  Information,
}: ContainerProps) {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-full relative">
        {AlertDialog}

        <div className="justify-between items-center mx-5 mt-5 mb-1 h-14  mobile:hidden laptop:flex">
          <h1 className="text-3xl font-bold">{title}</h1>
          {BtnAction}
        </div>
        <div className="flex justify-end mx-5"></div>
        {Information}
      </div>

      {FloatingActionButton}
    </div>
  );
}
