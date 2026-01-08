import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const CommentsModal = ({
  isOpen,
  onClose,
  comments,
  postUserName = "User"
}) => {
  if (!isOpen) return null;

  const commenterNames = [...new Set(comments.map(c => c.author))];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">

        {/* 🔹 Header (Sticky) */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b z-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Comments
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                On <span className="font-medium">{postUserName}</span>'s post
              </p>

              {commenterNames.length > 0 && (
                <p className="text-xs text-gray-600 mt-2">
                  <span className="font-medium">Commented by:</span>{" "}
                  {commenterNames.join(", ")}
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition"
            >
              <IoCloseOutline className="text-2xl text-gray-600" />
            </button>
          </div>
        </div>

        {/* 🔹 Comments */}
        <div className="px-6 py-5 max-h-[420px] overflow-y-auto space-y-5">
          {comments.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              Be the first person to comment
            </p>
          )}

          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* 🔹 Single Comment (Advanced UI) */
const CommentItem = ({ comment }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex items-start gap-4">
      <img
        src={comment.avatar}
        className="h-11 w-11 rounded-full object-cover"
        alt=""
      />

      <div className="flex-1">
        <div className="bg-gray-100 rounded-2xl px-4 py-3">
          <p className="font-semibold text-sm text-gray-900">
            {comment.author}
          </p>
          <p className="text-sm text-gray-700 mt-1 leading-relaxed">
            {comment.text}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-1 ml-1">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1 text-xs font-medium transition ${
              liked ? "text-[#2C3EA1]" : "text-gray-500"
            }`}
          >
            {liked ? <AiFillLike /> : <AiOutlineLike />}
            Like
          </button>

          <span className="text-xs text-gray-400">
            {comment.time || "Just now"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
