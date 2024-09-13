import React, { useState, useEffect, useCallback } from "react";
import logo from "../Assets/Logo.webp";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../FireBase"; // Import Firestore instance
import { debounce } from "./debounce"; // Import custom debounce function
import { CiWallet } from "react-icons/ci";

const MemeStickers = () => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const {
    chatid: paramChatid,
    username: paramUsername,
    referralid,
  } = useParams(); // Get values from route params

  // Retrieve chatid and username from localStorage if not available in params
  const chatid = paramChatid || localStorage.getItem("chatid");
  const username = paramUsername || localStorage.getItem("username");

  console.log(referralid);

  // Save chatid and username in localStorage if available
  useEffect(() => {
    if (chatid) {
      localStorage.setItem("chatid", chatid);
    }
    if (username) {
      localStorage.setItem("username", username);
      localStorage.setItem("totalCoinsMined", count);
    }
  }, [chatid, username]);

  // Save data to Firestore or update if it exists
  useEffect(() => {
    const saveDataToFirestore = async () => {
      try {
        const docRef = doc(db, "chats", chatid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          await setDoc(docRef, {
            username: username,
            coinMined: 0,
            invitedPeople: [],
          });
        } else {
          const data = docSnap.data();
          setCount(data.coinMined);
        }
      } catch (error) {
        console.error("Error saving document:", error);
      }
    };

    saveDataToFirestore();
  }, [chatid, username]);

  useEffect(() => {
    if (referralid) {
      addInvitedPerson(chatid, referralid);
    }
  }, [referralid, chatid]);

  const addInvitedPerson = async (chatid, person) => {
    try {
      const chatRef = doc(db, "chats", chatid);
      await updateDoc(chatRef, {
        invitedPeople: arrayUnion(person),
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // Create a debounced version of the updateMinedCoins function
  const debouncedUpdateMinedCoins = useCallback(
    debounce(async (chatid, newCoins) => {
      try {
        const chatRef = doc(db, "chats", chatid);
        await updateDoc(chatRef, { coinMined: newCoins });
      } catch (error) {
        console.error("Error updating document:", error);
      }
    }, 3000), // Debounce delay in milliseconds
    []
  );

  const handleBatClick = () => {
    setCount((prev) => prev + 1);
    setIsAnimating(true);

    // Delay setting isAnimating to false to allow animation to complete
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Duration of shake effect

    debouncedUpdateMinedCoins(chatid, count + 1);
  };

  return (
    <div className="bg-[#046be2] min-h-screen flex flex-col justify-between text-black">
      {/* Header Section */}
      <div className="flex flex-col justify-between h-[30%] items-start p-3 sm:p-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center pl-5 gap-2">
            <div>
              <img src={logo} className="h-12 w-12" alt="Logo" />
            </div>
            <div className="flex font-sans flex-col text-white leading-3 font-bold text-sm sm:text-base md:text-lg lg:text-xl">
              <span>Meme-stickers</span>
              <span>are coming</span>
            </div>
          </div>
          <div>
            <button className="text-black font-sans bg-white rounded-3xl text-sm  px-3  font-medium ">
              Connect
            </button>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-col    flex-grow  justify-evenly    bg-black rounded-t-2xl items-center ">
        <div>
          <button className="text-black  font-sans flex gap-1 items-center bg-white rounded-full  text-sm font-semibold px-3 ">
            <CiWallet />
            Connect wallet
          </button>
        </div>
        <div className="w-full  flex flex-col items-center justify-between">
          <motion.img
            onClick={handleBatClick}
            src={logo}
            alt="Dog Logo"
            className="w-60 max-w-xs sm:max-w-md rounded-t-xl object-contain"
            animate={isAnimating ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ type: "tween", duration: 0.5 }}
          />
          {isAnimating && (
            <motion.div
              className="absolute text-white text-4xl sm:text-5xl font-bold"
              initial={{ y: -40, opacity: 1 }}
              animate={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              +1
            </motion.div>
          )}
          <div className="pl-3 flex-col flex items-center p-1 justify-between rounded-md">
            <p className=" bg-gradient-to-r  font-sans from-gray-400 via-gray-300 to-gray-200 bg-clip-text text-transparent font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              {count}
            </p>
            <p className="text-gray-300 uppercase  font-sans text-lg">$Bugs</p>

          </div>
        </div>

        {/* Animation & Logo */}
        <div className="w-full h-52 flex flex-col items-center justify-start  relative">
          <button className="bg-white  font-sans mt-12 w-[90%] font-bold text-black text-md py-2 rounded-xl">
            Connect wallet and claim
          </button>
          <button className="bg-[#1c1c1e]  font-sans  mt-3 w-[90%] font-bold text-white text-md py-2 rounded-xl">
            Claim hints
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemeStickers;

// <div className="w-full flex items-center justify-center">
//   <div className="px-10 flex items-center p-1 justify-center rounded-md">
//     <p className="capitalize bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 bg-clip-text text-transparent font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
//       {count}
//     </p>
//   </div>
// </div>
