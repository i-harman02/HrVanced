import React, { useState, useEffect } from "react";
import User1 from "../assets/Group 3487.png";
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import CommentsModal from "./CommentsModal";

import { useSelector, useDispatch } from "react-redux";
import { toggleLike, addComment, deletePost } from "../slices/announcementSlice";

const BirthdayPost = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const role = user?.role?.toLowerCase();
  const isAdmin = role === "admin" || role === "superadmin";

  const isAnnouncement = post.postType === 1;

  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const hasCommented = comments.some(c => 
    c.employee === user?._id || 
    c.employee?._id === user?._id || 
    (typeof c.author === 'string' && c.author === user?.name)
  );

  // Sync state with props when they change
  useEffect(() => {
    if (post) {
      setComments(post.comments || []);
      const isLiked = (post.likes || []).some(l => 
        l.employee === user?._id || l.employee?._id === user?._id
      );
      setLiked(isLiked);
    }
  }, [post, user?._id]);

  const handleToggleLike = () => {
    setLiked(!liked);
    dispatch(toggleLike({ postId: post._id, userId: user._id }));
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: user?.name || "You",
      text: commentText,
      avatar: user?.profileImage || User1,
      time: "Just now"
    };

    setComments((prev) => [...prev, newComment]);
    dispatch(addComment({ postId: post._id, text: commentText, userId: user._id }));
    setCommentText("");
  };

  const handleRemovePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(post._id));
    }
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
        
        {/* Admin Delete Action */}
        {isAdmin && (
          <button 
            onClick={handleRemovePost}
            className="text-textgray hover:text-red-600 transition-colors p-1"
            title="Delete Post"
          >
            <RiDeleteBin5Line size={18} />
          </button>
        )}
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
          {/* Announcements allow everyone to like, Celebrations only Admin */}
          {(isAdmin || isAnnouncement) && (
            <button
              onClick={handleToggleLike}
              className="flex items-center gap-2 text-sm text-[#2C3EA1]"
            >
              {liked ? <AiFillLike className="text-lg" /> : <AiOutlineLike className="text-lg" />}
              Like
            </button>
          )}

          {!isAnnouncement && (
            <button
              onClick={() => setIsCommentsOpen(true)}
              className="flex items-center gap-2 text-sm text-[#2C3EA1]"
            >
              <AiOutlineComment className="text-lg" />
              Comment
            </button>
          )}
        </div>

        {!isAnnouncement && (
          <p className="text-sm text-textgray font-medium">
            {comments.length} Comments
          </p>
        )}
      </div>

      {/* 🔹 Input + Send (Hidden for Announcements) */}
      {!isAnnouncement && (
        <>
          {(!hasCommented || isAdmin) ? (
            <div className="pt-3 pb-3 px-6 -mx-6 border-t border-bordergray">
              <div className="flex items-center gap-3">
                <img src={user?.profileImage || User1} className="h-9 w-9 rounded-md" alt="" />
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
          ) : (
            <div className="pt-3 pb-3 px-6 -mx-6 border-t border-bordergray bg-gray-50/50 text-center">
              <p className="text-xs text-textgray italic">You have already commented on this post.</p>
            </div>
          )}
        </>
      )}

      {/* 🔹 Comments Modal */}
      {!isAnnouncement && (
        <CommentsModal
          isOpen={isCommentsOpen}
          onClose={() => setIsCommentsOpen(false)}
          comments={comments}
        />
      )}
    </div>
  );
};

export default BirthdayPost;
