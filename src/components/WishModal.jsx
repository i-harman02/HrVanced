// WishModal.jsx
import React, { useState } from "react";
import User1 from "../assets/Group 3487.png";
import { IoCloseOutline } from "react-icons/io5";
import { FaSmile } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import { FaImage } from "react-icons/fa6";

// EmojiPicker Component
const EmojiPicker = ({ onSelect, onClose }) => {
  const emojis = ["😊", "🎉", "🎂", "🎈", "🎁", "💐", "🌟", "❤️", "👏", "🥳", "🎊", "✨"];
  
  return (
    <div className="absolute bottom-full left-0 w-full bg-white border border-bordergray rounded shadow-lg p-2 z-10">
      <div className="flex flex-wrap gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => {
              onSelect(emoji);
              onClose();
            }}
            className="text-base hover:bg-gray-100 p-1 rounded"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

const WishModal = ({ isOpen, onClose, title, employeeName, onWishSent }) => {
  const [message, setMessage] = useState("");
  const [attachedImage, setAttachedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setAttachedImage(null);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji);
  };

  const handleSend = () => {
    // Pass the wish data back to parent component
    if (onWishSent) {
      onWishSent({
        message: message,
        image: attachedImage,
        employeeName: employeeName
      });
    }
    
    console.log("Wish sent to:", employeeName);
    console.log("Message:", message);
    console.log("Image:", attachedImage);
    
    // Close modal and reset
    onClose();
    setMessage("");
    setAttachedImage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* Modal Box */}
      <div className="bg-white w-full max-w-173.5 border border-bordergray shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-bordergray">
          <h2 className="text-2xl font-bold text-heading leading-tight">{title}</h2>
          <button onClick={onClose} className="text-black text-3xl">
            <IoCloseOutline />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="flex gap-5">
            <img src={User1} className="h-10 w-10 rounded-md" alt="" />

            <div className="flex-1 border border-bordergray rounded-sm px-2.5 py-3 focus-within:bg-gray-200/50">
              {/* Attached Image Preview */}
              {attachedImage && (
                <div className="relative mb-3 inline-block">
                  <img 
                    src={attachedImage} 
                    className="max-w-[100px] max-h-[70px] rounded object-cover" 
                    alt="attached" 
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-3 h-3 flex items-center justify-center hover:bg-red-600"
                  >
                    <IoCloseOutline className="text-xs" />
                  </button>
                </div>
              )}

              <textarea
                rows="4"
                placeholder="Write a message to wish them!"
                className="w-full text-sm focus:outline-none resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between mt-4 relative">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-[#71717B] hover:text-[#2C3EA1] cursor-pointer"
                title="Add emoji"
              >
                <FaSmile className="text-base" />
              </button>
              
              <button className="text-[#71717B] hover:text-[#2C3EA1] cursor-pointer" title="Add link">
                <AiOutlineLink className="text-base" />
              </button>
              
              <label className="text-[#71717B] hover:text-[#2C3EA1] cursor-pointer" title="Add photo">
                <FaImage className="text-base" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {showEmojiPicker && (
                <EmojiPicker
                  onSelect={handleEmojiSelect}
                  onClose={() => setShowEmojiPicker(false)}
                />
              )}
            </div>

            <button
              className="bg-primary text-white font-bold text-sm leading-[0.86] px-6 py-3 rounded-sm"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishModal;