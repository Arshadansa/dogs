import React, { useState, useEffect, useCallback } from "react";
import logo from "../Assets/Logo.webp";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../FireBase"; // Import Firestore instance
import { debounce } from "./debounce"; // Import custom debounce function

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
    }, 300), // Debounce delay in milliseconds
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
    <div className="bg-blue-600 min-h-screen flex flex-col justify-between text-white">
      <div className="flex flex-col justify-between h-36 items-start p-3 sm:p-4 border-b border-blue-700">
        <div className="w-full flex justify-center">
          <div className="flex pl-5 gap-2">
            <div>
              <img src={logo} className="h-12 w-12" alt="Logo" />
            </div>
            <div className="flex flex-col font-bold">
              <span>Meme-stickers</span>
              <span>are coming</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow justify-between p-3 sm:p-4 bg-black rounded-t-2xl items-center">
        <div className="w-full flex items-center justify-center">
          <div className="bg-[#1c1c1e] flex items-center p-1 justify-center rounded-md">
            <p className="capitalize font-bold text-5xl">{count}</p>
          </div>
        </div>

        <div className="w-full flex items-center justify-center relative">
          <motion.img
            onClick={handleBatClick}
            src={logo}
            alt="Dog Logo"
            className="w-full max-w-xs sm:max-w-md rounded-t-xl object-contain"
            animate={isAnimating ? { x: [-5, 5, -5, 5, 0] } : {}}
            transition={{ type: "tween", duration: 0.5 }}
          />
          {isAnimating && (
            <motion.div
              className="absolute text-white text-4xl font-bold"
              initial={{ y: -40, opacity: 1 }}
              animate={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              +1
            </motion.div>
          )}
        </div>

        <div className="flex flex-col w-full h-32 mb-12 space-y-3"></div>
      </div>
    </div>
  );
};

export default MemeStickers;
