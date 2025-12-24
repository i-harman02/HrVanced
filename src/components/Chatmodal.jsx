import { IoClose } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import User3 from "../assets/Group 3489.png";
const ChatModal = ({ onClose }) => {
  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/30 z-40" />

      <div className="fixed bottom-24 right-6 w-60 md:w-[320px]  bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src={User3} alt="user" className="w-8 h-8 rounded-full" />
            <span className="text-sm font-semibold">Anit</span>
          </div>
          <button onClick={onClose}>
            <IoClose size={20} />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          <div className="bg-orange-100 text-sm p-2 rounded-lg w-fit max-w-[80%]">
            Lorem ipsum dolor sit amet
          </div>

          <div className="bg-blue-100 text-sm p-2 rounded-lg w-fit max-w-[80%] ml-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </div>
        </div>

        
        <div className="border-t border-gray-200 p-3 flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter Message"
            className="flex-1 text-sm outline-none"
          />
          <button className="text-blue-600">
            <IoSend size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatModal;
