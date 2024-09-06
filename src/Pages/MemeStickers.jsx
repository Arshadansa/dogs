import React, { useState, useEffect } from "react";
import logo from "../Assets/Logo.webp";
import { CiWallet } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiDotsThreeCircle } from "react-icons/pi";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../FireBase"; // Import Firestore instance

const MemeStickers = () => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { chatid, username, referralid } = useParams(); // Assuming referralId is in the route params
 console.log(referralid);
 
  // Save data to Firestore or update if it exists
  useEffect(() => {
    const saveDataToFirestore = async () => {
      try {
        const docRef = doc(db, "chats", chatid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          // If document doesn't exist, create it
          await setDoc(docRef, {
            username: username,
            coinMined: 0, // Initial value
            invitedPeople: [], // Initially empty
          });
          console.log("Document created!");
        } else {
          console.log("Document already exists!");
          // Fetch the current coinMined value if the document exists
          const data = docSnap.data();
          setCount(data.coinMined);
          if (data.invitedPeople && data.invitedPeople.includes(referralid)) {
            console.log(`Referral ID ${referralid} already exists in the invitedPeople list.`);
          } else {
            console.log("Referral ID does not exist in the invitedPeople list.");
          }
          
        }
      } catch (error) {
        console.error("Error saving document:", error);
      }
    };

    saveDataToFirestore();
  }, [chatid, username]);

  // Handle referral ID if present
  useEffect(() => {
    if (referralid) {
      addInvitedPerson(chatid, referralid);
    }
  }, [referralid, chatid]);

  // Function to add invited person to the Firestore document
  const addInvitedPerson = async (chatid, person) => {
    console.log(person);
    
    try {
      const chatRef = doc(db, "chats", chatid);
      await updateDoc(chatRef, {
        invitedPeople: arrayUnion(person), // Add person to invitedPeople array
      });
      console.log("Person added to invited list!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // Function to handle clicks and update mined coins
  const handleBatClick = () => {
    setCount((prev) => prev + 1);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 3000); // 1 second for the animation
    updateMinedCoins(chatid, count + 1);
  };

  // Function to update the mined coins in Firestore
  const updateMinedCoins = async (chatid, newCoins) => {
    try {
      const chatRef = doc(db, "chats", chatid);
      await updateDoc(chatRef, {
        coinMined: newCoins,
      });
      console.log("Coins mined updated!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="bg-blue-600 min-h-screen flex flex-col justify-between text-white">
      {/* Header */}
      <div className="flex flex-col justify-between h-36 items-start p-3 sm:p-4 border-b border-blue-700">
        <div className="w-full flex justify-between">
          <button className="text-white text-lg font-bold">Close</button>
          <div className="flex flex-col justify-center items-center space-x-1">
            <div className="flex items-center">
              <span className="font-bold text-lg">Dogs 🦴 </span>
              <HiOutlineCheckBadge className=" text-white bg-blue-600" />
            </div>
            <p className="text-white font-thin text-xs"> mini-app</p>
          </div>
          <button className="text-white">
            <PiDotsThreeCircle size={24} className="text-white" />
          </button>
        </div>

        <div className="w-full flex  justify-between">
          <div className="flex pl-5 gap-2">
            <div>
              <img src={logo} className="h-12 w-12" alt="" />
            </div>
            <div className="flex flex-col font-bold">
              {" "}
              <span>Meme-strickers</span>
              <span>are coming</span>
            </div>
          </div>
          <div className="bg-white flex items-center rounded-full px-7 py-0 h-10">
            <span className="text-black font-bold">Whaaat</span>
          </div>
        </div>
      </div>

      {/* Meme Section */}
      <div className="flex flex-col flex-grow justify-between p-3 sm:p-4 bg-black rounded-t-2xl items-center">
        {/* Wallet Section */}
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center gap-1 bg-[#1c1c1e] p-2 rounded-md">
            <CiWallet className="text-white font-medium" size={20} />
            <span className="text-white font-medium">UQC...JDU</span>
            <MdKeyboardArrowDown className="text-white" />
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full flex items-center justify-center">
          <img
            onClick={handleBatClick}
            src={logo}
            alt="Dog Logo"
            className="w-full max-w-xs sm:max-w-md rounded-t-xl object-contain"
          />
          {isAnimating && (
            <motion.div
              className="absolute text-red-400 text-4xl font-bold"
              initial={{ y: -40, opacity: 1 }}
              animate={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              +1
            </motion.div>
          )}
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col w-full h-32 mb-12 space-y-3">
          <div className="bg-[#7f7f7f] text-center text-black font-bold text-lg px-4 py-3 w-full rounded-lg">
            6,623 $DOGS → Processing
          </div>

          <button className="bg-[#1c1c1e] text-center font-bold text-lg text-white px-4 py-3 w-full rounded-lg">
            Claim hints
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemeStickers;
