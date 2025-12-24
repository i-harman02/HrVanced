import { IoClose } from "react-icons/io5";

const ChatModal = ({ onClose }) => {
  return (
    <>
      {/* Overlay (click anywhere outside = close) */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 z-40"
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-18 right-6 w-40 md:w-[200px] bg-white rounded-sm shadow-2xl z-50 flex flex-col overflow-hidden"
      >
        {/* Header */}
    

        {/* Menu */}
        <div className="text-sm">
          <p
            onClick={onClose}
            className="text-blue-600 p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 font-semibold"
          >
            Profile
          </p>

          <p
            onClick={onClose}
            className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 font-semibold"
          >
            Logout
          </p>

          <p
            onClick={onClose}
            className="p-2 cursor-pointer hover:bg-gray-100 font-semibold"
          >
            Login screen
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatModal;
