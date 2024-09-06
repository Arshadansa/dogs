import React from "react";
import { RiHomeLine } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { MdOutlineLeaderboard } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white py-2 flex justify-around">
      <Link to={"/home/:chatid/:username/:referralid"}>
        <button className="flex flex-col items-center">
          <RiHomeLine size={24} className="text-[#aeaeae]" />
          <span className="text-sm">Home</span>
        </button>
      </Link>
      <Link to={"/leaderboard"}>
        <button className="flex flex-col items-center">
          <MdOutlineLeaderboard size={24} className="text-[#aeaeae]" />
          <span className="text-sm">Leaderboard</span>
        </button>
      </Link>
      <Link to="/invite">
        <button className="flex flex-col items-center">
          <GoPeople size={24} className="text-[#aeaeae]" />
          <span className="text-sm">Friends</span>
        </button>
      </Link>
    </div>
  );
}

export default Footer;
