import React from "react";

const item = 5;

export default function LoadingBankPage() {
  return (
    <>
      <div className="flex flex-row gap-5 m-10">
        {[...Array(item)].map((item) => (
          <div className="skeleton w-96 opacity-15 h-[81vh]"></div>
        ))}
      </div>
    </>
  );
}
