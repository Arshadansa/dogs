import React, { useState } from "react";
import logo from "../Assets/Logo.webp";

// Modal component
const Modal = ({ showModal, closeModal, userId }) => {
  const userLink = `t.me/bugs_bot?user=${userId}`;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(userLink)
      .then(() => {
        closeModal();
      })
      .catch((err) => {
        console.error("Failed to copy the text: ", err);
      });
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Invite friends",
          text: "Join me on this awesome platform!",
          url: userLink,
        })
        .then(() => {
          closeModal();
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong sharing the link", error);
        });
    } else {
      // alert("Sharing not supported, but you can copy the link!");
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-end z-50">
      <div className="bg-black text-white rounded-lg p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Invite friends</h2>
          <button onClick={closeModal} className="text-white">
            ✖️
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={copyToClipboard}
            className="bg-gray-800 py-3 px-6 rounded-lg"
          >
            Copy invite link
          </button>
          <button
            onClick={shareLink}
            className="bg-gray-800 py-3 px-6 rounded-lg"
          >
            Share invite link
          </button>
        </div>
      </div>
    </div>
  );
};

const MemeStickers = () => {
  const [showModal, setShowModal] = useState(false);
  const chatId = localStorage.getItem("chatid");
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="bg-black min-h-screen flex flex-col justify-between text-white">
        <div className="flex flex-col flex-grow h-[100%] justify-between p-3 sm:p-4 bg-black rounded-t-2xl items-center">
          {/* Invite Message */}
          <div className="text-center flex flex-col gap-10 ">
            <div>
              <h2 className="text-4xl font-bold mt-2">Invite friends</h2>
              <h2 className="text-4xl font-bold mb-4">and get more Bugs</h2>
            </div>
            <div className="flex justify-center mb-4">
              <img
                src={logo}
                alt="Dog Logo"
                className="w-40 h-40 object-contain"
              />
            </div>
            <div>
              <p className="text-xl font-medium">
                Tap on the button to invite your
              </p>
              <p className="text-xl font-medium">friends</p>
            </div>
          </div>

          {/* Invite Button */}
          <div className="flex justify-center mb-[30%] w-full">
            <button
              onClick={openModal}
              className="bg-white w-full font-bold text-black text-lg px-8 py-3 rounded-lg"
            >
              Invite friends
            </button>
          </div>
        </div>

        {/* Modal */}
      </div>
      <Modal showModal={showModal} closeModal={closeModal} userId={chatId} />
    </>
  );
};

export default MemeStickers;
