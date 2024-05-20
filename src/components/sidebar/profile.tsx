import React from "react";
import Image from "next/image";
import { TbUserEdit } from "react-icons/tb";

const Profile = () => {
  return (
    <div className="pb-4 flex flex-row items-center gap-3 mx-auto">
      <div className="avatar">
        <div className="w-20 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-neutral-content text-lg font-semibold">
          Latthaphon Phoemmanirat
        </p>
        <p className="text-gray-500 text-base font-medium">Admin</p>
      </div>
    </div>
  );
};

export default Profile;
