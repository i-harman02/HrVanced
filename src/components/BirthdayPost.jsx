// BirthdayPost.jsx
import React, { useState } from "react";
import User1 from "../assets/Group 3487.png";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";

const BirthdayPost = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [liked, setLiked] = useState(false);

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        author: "You",
        text: commentText,
        avatar: User1,
        time: "Just now"
      };
      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  return (
    <div className="bg-gray-200/50 rounded-xl pt-6 px-6 mb-4">
      {/* Post Header */}
      <div className="flex items-center gap-3.5 mb-5">
        <img src={post.authorAvatar} className="h-10 w-10 rounded-md" alt="" />
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-2">
            <p className="font-medium text-heading text-sm leading-none">{post.author}</p>
            <span className="text-textgray text-xs leading-none">(Create a post)</span>
          </div>
          <p className="text-xs text-textgray leading-none">{post.date}</p>
        </div>
      </div>

      {/* Post Content - Image from wish modal upload */}
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

      <div className="flex items-center justify-between border-t border-bordergray p-6 -mx-6">
        {/* Like and Comment buttons */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-2 text-sm text-[#2C3EA1]`}
        >
          {liked ? <AiFillLike className="text-lg" /> :
          <AiOutlineLike className="text-lg" />}
          <span>Like</span>
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-sm text-[#2C3EA1]"
        >
          <AiOutlineComment className="text-lg" />
          <span>Comment</span>
        </button>
      </div>
      {/* Comments count */}
        <p className="text-sm text-textgray font-medium">{comments.length} Comments</p>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="pt-3 pb-6 px-6 -mx-6 border-t border-bordergray">
          {/* "Be the first person to comment" text */}
          {comments.length === 0 && (
            <p className="text-xs color-primary mb-3">Be the first person to comment</p>
          )}

          {/* Existing Comments */}
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 mb-5">
              <img src={comment.avatar} className="h-9 w-9 rounded-md" alt="" />
              <div className="flex-1 bg-white rounded px-2.5 py-2">
                <p className="font-medium text-xs leading-tight">{comment.author}</p>
                <p className="text-sm text-textgray leading-tight mt-2">{comment.text}</p>
              </div>
            </div>
          ))}

          {/* Comment Input */}
          <div className="flex items-center gap-3 mt-3">
            <img src={User1} className="h-9 w-9 rounded-md" alt="" />
            <div className="flex-1 flex gap-3">
              <input
                type="text"
                placeholder="Write a Comment"
                className="flex-1 border border-bordergray rounded-sm px-2.5 py-2 text-sm leading-[0.86] bg-white focus:outline-none focus:ring-1 focus:ring-[#2C3EA1]"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
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
      )}
    </div>
  );
};

export default BirthdayPost;