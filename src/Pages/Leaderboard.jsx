import React from "react";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { PiDotsThreeCircle } from "react-icons/pi";

const Leaderboard = () => {
  const users = [
    { rank: 1, name: "elkanadi", score: 23787023, medal: "🥇" },
    { rank: 2, name: "mariefelicita", score: 20663171, medal: "🥈" },
    { rank: 3, name: "xaffizmedia", score: 17021994, medal: "🥉" },
    { rank: 4, name: "glebtma", score: 16939544 },
    { rank: 5, name: "imGet", score: 16106372 },
  ];

  return (
    <div className="bg-black text-white min-h-screen px-3">
      {/* Header */}
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

      <div className="flex flex-col flex-grow gap-6  justify-between  sm:p-4 bg-black rounded-t-2xl items-center">
        <div className=" w-full flex flex-col gap-4 mt-3">
          <h2 className="text-3xl  text-center mb-4">
            Telegram Wall of Fame
          </h2>
          <div className="flex  rounded-xl bg-gray-800 p-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-400 text-black w-8 h-8 flex justify-center items-center rounded-full">
                BU
              </div>
              <div>
                <h2 className="font-semibold">Budapest007</h2>
                <p className="text-gray-400 text-sm">#14234157</p>
              </div>
            </div>
            <p className="font-bold">6,623 DOGS</p>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="w-full">
          <div className="text-white mb-2">45.4M holders</div>
          {users.map((user) => (
            <div
              key={user.rank}
              className="flex justify-between items-center bg-gray-900 p-3 rounded-xl mb-2"
            >
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 flex justify-center items-center rounded-full bg-${
                    user.rank === 1
                      ? "blue-600"
                      : user.rank === 2
                      ? "pink-600"
                      : user.rank === 3
                      ? "yellow-400"
                      : "gray-600"
                  } text-white`}
                >
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm">{user.score.toLocaleString()} DOGS</p>
                </div>
              </div>
              <p className="text-lg">
                {user.medal ? user.medal : `#${user.rank}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
