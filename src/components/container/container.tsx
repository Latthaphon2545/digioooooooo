import Link from "next/link";
import React from "react";

interface ContainerProps {
  isEditor: boolean;
  title: string;
  Information: any;
  NavigatorBtn: string;
  textBtn: string | React.ReactNode;
  AlertDialog: any;
  FloatingActionButton: any;
}

export default function Container({
  isEditor,
  title,
  Information,
  NavigatorBtn,
  textBtn,
  AlertDialog,
  FloatingActionButton,
}: ContainerProps) {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-full relative">
        {AlertDialog}

        <div className="justify-between items-center mx-5 mt-5 mb-1 h-14  mobile:hidden laptop:flex">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className={`${!isEditor && "cursor-not-allowed"}`}>
            <div className="mobile:hidden laptop:block">
              {isEditor ? (
                <Link href={NavigatorBtn}>
                  <button className={`btn btn-primary`}>{textBtn}</button>
                </Link>
              ) : (
                <button className={`btn btn-primary`} disabled>
                  {textBtn}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mx-5"></div>
        {Information}
      </div>

      {FloatingActionButton}
    </div>
  );
}
