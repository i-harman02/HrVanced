import React, { useState } from "react";
import { FaSmile, FaImage } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import User1 from "../assets/Group 3487.png";

const EmojiPicker = ({ onSelect, onClose }) => {
  const emojis = ["😊", "🎉", "🎂", "🎈", "🎁", "💐", "🌟", "❤️", "👏", "🥳", "🎊", "✨"];
  
  return (
    <div className="absolute bottom-full left-0 mb-2 bg-white border border-bordergray rounded shadow-lg p-2 z-10">
      <div className="flex flex-wrap gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => {
              onSelect(emoji);
              onClose();
            }}
            className="text-base hover:bg-gray-100 p-1 rounded cursor-pointer"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

const AnnouncementComposer = ({ onAnnouncementCreate }) => {
  const [message, setMessage] = useState("");
  const [attachedImage, setAttachedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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

  const handleCreate = () => {
    if (!message.trim() && !attachedImage) return;

    const newAnnouncement = {
      id: Date.now(),
      author: "You",
      authorAvatar: User1,
      date: new Date().toISOString(),
      message: message,
      image: attachedImage,
      comments: []
    };

    if (onAnnouncementCreate) {
      onAnnouncementCreate(newAnnouncement);
    }

    // Reset form
    setMessage("");
    setAttachedImage(null);
  };

  return (
    <div className="border-t border-bordergray pt-8">
      <div className="flex gap-3">
        <img src={User1} className="h-10 w-10 rounded-md shrink-0" alt="User" />

        <div className="flex-1">
          <div className="border border-bordergray rounded-sm px-3 py-2.5 focus-within:bg-gray-50">
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
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                >
                  <IoCloseOutline className="text-sm" />
                </button>
              </div>
            )}

            <textarea
                rows="3"
                placeholder="Create Announcement"
                className="w-full text-sm focus:outline-none resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleCreate();
                }
              }}
              />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center mt-3 relative">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-[#71717B] hover:text-[#2C3EA1] transition-colors cursor-pointer"
                title="Add emoji"
              >
                <FaSmile className="text-lg" />
              </button>
              
              <button 
                className="text-[#71717B] hover:text-[#2C3EA1] transition-colors cursor-pointer" 
                title="Add link"
              >
                <AiOutlineLink className="text-lg" />
              </button>
              
              <label className="text-[#71717B] hover:text-[#2C3EA1] transition-colors cursor-pointer" title="Add photo">
                <FaImage className="text-lg" />
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
              className="bg-primary text-white font-semibold leading-[1.143] text-sm px-6 py-2.5 rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              onClick={handleCreate}
              disabled={!message.trim() && !attachedImage}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementComposer;