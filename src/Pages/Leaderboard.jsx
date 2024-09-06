import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore"; // Firestore methods
import { db } from "../FireBase"; // Firebase config
import logo from "../Assets/Logo.webp";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [totalCoinsMined, setTotalCoinsMined] = useState(0); // State for total coins
  const [loading, setLoading] = useState(true); // State for loading

  // Retrieve chatid and username from localStorage
  const chatId = localStorage.getItem("chatid");
  const username = localStorage.getItem("username");

  // Fetch all users from Firestore and sort them by coinsMined
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Start loading
        const querySnapshot = await getDocs(collection(db, "chats"));
        const usersData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // Include the document ID
        }));

        // Filter out the current user
        const filteredUsers = usersData.filter(
          (user) => user.username !== username
        );
        const total = filteredUsers.reduce(
          (acc, user) => acc + (user.coinMined || 0),
          0
        );
        setTotalCoinsMined(total);
        const sortedUsers = filteredUsers.sort((a, b) => {
          const coinsA = Number(a.coinMined) || 0;
          const coinsB = Number(b.coinMined) || 0;
          return coinsB - coinsA;
        });

        setUsers(sortedUsers); // Set sorted and filtered users
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchUsers();
  }, [username]);

  if (loading) {
    return (
      <div
        style={{
          backgroundImage: `url(${logo})`, // Replace with your image path
          backgroundSize: "contain",
          backgroundPosition: "center",
           backgroundRepeat:"no-repeat"
        }}
        className="flex items-center justify-center min-h-screen bg-black text-white"
      >
        {/* Replace with your loader animation or message */}
        {/* <div className="loader text-black font-bold">Loading...</div> */}
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen px-3">
      {/* Header */}
      <div className="flex flex-col justify-between h-20 items-start p-3 sm:p-4">
        {/* Optional header content */}
      </div>

      <div className="flex flex-col flex-grow gap-6 justify-between sm:p-4 bg-black rounded-t-2xl items-center">
        <div className="w-full flex flex-col gap-4 mt-3">
          <h2 className="text-3xl text-center mb-4">Telegram Wall of Fame</h2>

          {/* Display current user's data */}
          <div className="flex rounded-xl bg-gray-800 p-4 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-400 capitalize text-black w-8 h-8 flex justify-center items-center rounded-full">
                {username ? username.slice(0, 2) : "N/A"}
              </div>
              <div>
                <h2 className="font-semibold capitalize">
                  {username || "N/A"}
                </h2>
                <p className="text-gray-400 text-sm">{chatId || "N/A"}</p>
              </div>
            </div>
            <p className="font-bold">{totalCoinsMined} BUGS</p>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="w-full h-full overflow-y-scroll">
          <div className="text-white mb-2">{users.length} holders</div>
          {users.map((user, index) => (
            <div
              key={user.id}
              className="flex justify-between items-center bg-gray-900 p-3 rounded-xl mb-2"
            >
              <div className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 flex justify-center items-center rounded-full bg-${
                    index === 0
                      ? "blue-600"
                      : index === 1
                      ? "pink-600"
                      : index === 2
                      ? "yellow-400"
                      : "gray-600"
                  } text-white`}
                >
                  {user.username.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold">{user.username}</h3>
                  <p className="text-sm">
                    {user.coinMined?.toLocaleString() || 0} BUGS
                  </p>
                </div>
              </div>
              <p className="text-lg">
                {index < 3 ? ["🥇", "🥈", "🥉"][index] : `#${index + 1}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
