import React from "react";
import logo from "../Assets/Logo.webp";
import { MdKeyboardArrowDown, MdOutlineLeaderboard } from "react-icons/md";
import { RiHomeLine } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { PiDotsThreeCircle } from "react-icons/pi";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { Link } from "react-router-dom";

const MemeStickers = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col justify-between text-white">
      <div className="flex flex-col justify-between h-20 items-start p-3 sm:p-4  ">
        <div className="w-full flex justify-between">
          <button className="text-white text-lg font-bold">Close</button>
          <div className="flex flex-col justify-center items-center space-x-1">
            <div className="flex items-center">
              <span className="font-bold text-lg">Dogs 🦴 </span>
              <HiOutlineCheckBadge className=" text-white bg-blue-600" />
            </div>
            <p className="text-white  font-thin text-xs"> mini-app</p>
          </div>
          <button className="text-white">
            <PiDotsThreeCircle size={24} className="text-white" />
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-grow  justify-between p-3 sm:p-4 bg-black rounded-t-2xl items-center">
        {/* Invite Message */}
        <div className="text-center flex flex-col gap-10 ">
          <div>
            <h2 className="text-4xl font-bold mb-4">Invite friends</h2>
            <h2 className="text-4xl font-bold mb-4">and get more DOGS</h2>
          </div>
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="Dog Logo"
              className="w-40 h-40 object-contain"
            />
          </div>
          <div>
            <p className="text-xl font-medium  ">
              Tap on the button to invite your{" "}
            </p>
            <p className="text-xl font-medium ">friends</p>
          </div>
        </div>

        {/* Invite Button */}
        <div className="flex justify-center mb-20 w-full">
          <button className="bg-white w-full font-bold text-black text-lg px-8 py-3 rounded-lg">
            Invite friends
          </button>
        </div>
      </div>

     
    </div>
  );
};

export default MemeStickers;
