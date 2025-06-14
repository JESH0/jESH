import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppwriteService from "../appwrite/config";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import send from "../assets/send.png";
import {
  FaShare,
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaFacebookMessenger,
  FaTwitter,
  FaThumbsUp,
  FaRegComment,
} from "react-icons/fa";

export default function Post() {
  const [post, setPost] = useState(null);
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState("");

  const boxRef = useRef(null);
  const commentBoxRef = useRef(null);
  const optionRef = useRef(null);

  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData && post.userid === userData.$id;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
    whatsapp: `https://api.whatsapp.com/send?text=${window.location.href}`,
    instagram: "https://www.instagram.com/",
    messenger: `fb-messenger://share/?link=${window.location.href}`,
    twitter: `https://twitter.com/intent/tweet?url=${window.location.href}`,
  };

  useEffect(() => {
    if (!slug) return navigate("/");
    AppwriteService.getPost(slug).then((fetchedPost) => {
      if (fetchedPost) setPost(fetchedPost);
      else navigate("/");
    });
  }, [slug, navigate]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        boxRef.current && !boxRef.current.contains(e.target) &&
        optionRef.current && !optionRef.current.contains(e.target)
      ) {
        setOpen(false);
        setOption(false);
      }
      if (commentBoxRef.current && !commentBoxRef.current.contains(e.target)) {
        setShowInput(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => prev + (liked ? -1 : 1));
  };

  const handleDelete = async () => {
    if (!post) return;
    try {
      const resp = await AppwriteService.deletePost(post.$id);
      if (resp && post.featuredimage) {
        await AppwriteService.deleteFile(post.featuredimage);
      }
      navigate("/");
    } catch (err) {
      alert(`Delete failed: ${err.message || err}`);
    }
  };

  if (!post) return null;

  return (
    <div className="p-4 sm:p-6 md:p-10 cursor-pointer select-none">
      <Container>
        <div className="w-full flex flex-col justify-center items-center gap-4 border border-amber-200 rounded-xl p-4 bg-gray-800/80 backdrop-blur-lg">
          {post.featuredimage && (
            <img
              src={AppwriteService.getFileView(post.featuredimage)}
              alt={post.title}
              className="w-full max-w-4xl max-h-[500px] object-contain rounded-xl"
            />
          )}

          {/* Buttons */}
          <div className="flex gap-3 text-sm flex-wrap justify-center">
            {/* Like */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-2xl transition-all duration-200 text-xs ${
                liked ? "text-blue-500" : "text-white"
              }`}
            >
              <FaThumbsUp size={14} /> {likeCount}
            </button>

            {/* Comment */}
            <button
              onClick={() => setShowInput((prev) => !prev)}
              className="flex items-center gap-2 text-white border border-gray-600 rounded-2xl px-4 py-2 text-xs"
            >
              <FaRegComment size={14} />
            </button>

            {/* Share */}
            <div className="relative z-50" ref={boxRef}>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 text-white border border-gray-600 rounded-2xl text-xs"
              >
                <FaShare size={14} />
              </button>
              {open && (
                <div className="absolute top-full mt-2 right-4 flex gap-3 bg-gray-900 border border-gray-700 p-2 rounded-lg shadow-lg z-50">
                  <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:scale-110 transition-transform">
                    <FaFacebook size={18} />
                  </a>
                  <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:scale-110 transition-transform">
                    <FaWhatsapp size={18} />
                  </a>
                  <a href={shareLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:scale-110 transition-transform">
                    <FaInstagram size={18} />
                  </a>
                  <a href={shareLinks.messenger} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:scale-110 transition-transform">
                    <FaFacebookMessenger size={18} />
                  </a>
                  <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:scale-110 transition-transform">
                    <FaTwitter size={18} />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Comment Input */}
          {showInput && (
            <form
              ref={commentBoxRef}
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Comment submitted:", comment);
                setComment("");
                setShowInput(false);
              }}
              className="flex items-center gap-2 w-full max-w-md mt-2 rounded-2xl border border-white p-2"
            >
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full bg-transparent text-white focus:outline-none px-2"
                autoFocus
              />
              <button type="submit">
                <img className="h-5 w-5" src={send} alt="send" />
              </button>
            </form>
          )}

          {isAuthor && (
            <div className="absolute top-6 right-6 z-50 text-white" ref={optionRef}>
              <button
                onClick={() => setOption((prev) => !prev)}
                className="hover:text-gray-300 text-xl"
              >
                ⋮
              </button>
              {option && (
                <div className="mt-2 w-36 bg-white rounded-lg shadow-lg ring-1 ring-black/5 text-sm">
                  <Link
                    to={`/edit-post/${post.$id}`}
                    className="block px-4 py-2 hover:bg-purple-100 text-purple-700 font-medium"
                    onClick={() => setOption(false)}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-medium"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Title & Content */}
          <div className="w-full max-w-4xl">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-4 mb-2">{post.title}</h1>
            <div className="prose prose-invert text-gray-200 max-w-none">
              {post.content ? parse(post.content) : <p>No content available.</p>}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
