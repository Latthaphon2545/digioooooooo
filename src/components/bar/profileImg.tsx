import React from "react";
import { GiJewelCrown } from "react-icons/gi";

const Profile = () => {
  return (
    <div className="avatar placeholder">
      <div className="bg-primary text-white rounded-full w-11 flex flex-col items-center justify-center">
        <GiJewelCrown className="text-2xl" color="white" />
        <span className="text-xs">LP</span>
      </div>
    </div>
  );
};

export default Profile;
