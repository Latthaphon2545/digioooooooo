import React from "react";
import Image from "next/image";

const Profile = () => {
  return (
    <div className="px-2 py-8 pb-4 flex flex-row items-center gap-3">
      <Image
        src="/image/twon.jpeg"
        alt="twon's image"
        width={100}
        height={100}
        className="w-20 h-20 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <p className="text-neutral-content text-xl font-semibold">
          Twon Sonsai
        </p>
        <p className="text-gray-500 text-base font-medium">Admin</p>
      </div>
    </div>
  );
};

export default Profile;
