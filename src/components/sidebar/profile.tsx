import React from "react";
import Image from "next/image";
import { TbUserEdit } from "react-icons/tb";
import twon from "/public/image/twon.png";

const Profile = () => {
  return (
    <div className="pb-4 flex flex-row items-center gap-3">
      <div className="avatar">
        <div className="w-20 rounded-full">
          <Image src={twon} alt="" />
        </div>
      </div>
      <div className="flex flex-col w-auto">
        <p className="text-neutral-content text-lg font-semibold">
          Latthaphon P.
        </p>
        <p className="text-gray-500 text-base font-medium">Admin</p>
      </div>
    </div>
  );
};

export default Profile;
