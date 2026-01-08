import React, { useState } from "react";
import User1 from "../assets/Group 3487.png";
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai";
import CommentsModal from "./CommentsModal";

const BirthdayPost = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: "You",
      text: commentText,
      avatar: User1,
      time: "Just now"
    };

    setComments((prev) => [...prev, newComment]);
    setCommentText("");
  };

  return (
    <div className="bg-gray-200/50 rounded-xl pt-6 px-6 mb-4">
      {/* Header */}
      <div className="flex items-center gap-3.5 mb-5">
        <img src={post.authorAvatar} className="h-10 w-10 rounded-md" alt="" />
        <div className="flex-1">
          <p className="font-medium text-sm">{post.author}</p>
          <p className="text-xs text-textgray">{post.date}</p>
        </div>
      </div>

      {/* Image */}
      {post.image && (
        <div className="mb-5">
          <img
            src={post.image}
            className="w-full max-w-87.5 max-h-87.5 rounded-xl object-cover"
            alt=""
          />
        </div>
      )}

      <p className="text-sm text-heading mb-5">{post.message}</p>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-bordergray p-6 -mx-6">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-2 text-sm text-[#2C3EA1]"
          >
            {liked ? <AiFillLike className="text-lg" /> : <AiOutlineLike className="text-lg" />}
            Like
          </button>

          <button
            onClick={() => setIsCommentsOpen(true)}
            className="flex items-center gap-2 text-sm text-[#2C3EA1]"
          >
            <AiOutlineComment className="text-lg" />
            Comment
          </button>
        </div>

        <p className="text-sm text-textgray font-medium">
          {comments.length} Comments
        </p>
      </div>

      {/* 🔹 Input + Send ALWAYS visible */}
      <div className="pt-3 pb-3 px-6 -mx-6 border-t border-bordergray">
        <div className="flex items-center gap-3">
          <img src={User1} className="h-9 w-9 rounded-md" alt="" />
          <div className="flex-1 flex gap-3">
            <input
              type="text"
              placeholder="Write a Comment"
              className="flex-1 border border-bordergray rounded-sm px-2.5 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#2C3EA1]"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
            />
            <button
              onClick={handleAddComment}
              className="bg-primary text-white font-bold text-sm px-6 py-2 rounded-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Comments Modal */}
      <CommentsModal
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        comments={comments}
      />
    </div>
  );
};

export default BirthdayPost;
