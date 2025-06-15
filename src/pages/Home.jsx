import React, { useEffect, useState, useRef } from "react";
import AppwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
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

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeShareMenu, setActiveShareMenu] = useState(null); // Track which post's share menu is open
    const [likedStates, setLikedStates] = useState({});
    const [likeCounts, setLikeCounts] = useState({});
    const [showInputStates, setShowInputStates] = useState({});
    const [comments, setComments] = useState({});

    const shareMenuRefs = useRef({});
    const commentBoxRefs = useRef({});

    useEffect(() => {
        AppwriteService.getPosts().then((posts) => {
            if (posts && posts.documents) {
                const postsWithImageUrls = posts.documents.map((post) => {
                    const imageUrl = post.featuredimage
                        ? AppwriteService.getFileView(post.featuredimage)
                        : null;
                    return {
                        ...post,
                        imageUrl,
                    };
                });
                setPosts(postsWithImageUrls);
                
                // Initialize states for each post
                setLikedStates(Object.fromEntries(postsWithImageUrls.map(post => [post.$id, false])));
                setLikeCounts(Object.fromEntries(postsWithImageUrls.map(post => [post.$id, 0])));
                setShowInputStates(Object.fromEntries(postsWithImageUrls.map(post => [post.$id, false])));
                setComments(Object.fromEntries(postsWithImageUrls.map(post => [post.$id, ""])));
            }
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            // Close share menu if clicked outside
            if (activeShareMenu && 
                shareMenuRefs.current[activeShareMenu] && 
                !shareMenuRefs.current[activeShareMenu].contains(e.target)) {
                setActiveShareMenu(null);
            }

            // Close comment input if clicked outside
            Object.keys(commentBoxRefs.current).forEach(postId => {
                const commentBoxRef = commentBoxRefs.current[postId];
                if (commentBoxRef && !commentBoxRef.contains(e.target)){
                    setShowInputStates(prev => ({
                        ...prev,
                        [postId]: false
                    }));
                }
            });
        };
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeShareMenu]);

    const handleLike = (postId) => {
        setLikedStates(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
        setLikeCounts(prev => ({
            ...prev,
            [postId]: prev[postId] + (likedStates[postId] ? -1 : 1)
        }));
    };

    const handleCommentSubmit = (e, postId) => {
        e.preventDefault();
        console.log("Comment submitted for post", postId, ":", comments[postId]);
        setComments(prev => ({
            ...prev,
            [postId]: ""
        }));
        setShowInputStates(prev => ({
            ...prev,
            [postId]: false
        }));
    };

    const toggleShareMenu = (postId) => {
        setActiveShareMenu(activeShareMenu === postId ? null : postId);
    };

    const getShareLinks = (postId) => {
        const postUrl = `${window.location.origin}/post/${postId}`;
        return {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`,
            whatsapp: `https://api.whatsapp.com/send?text=${postUrl}`,
            instagram: "https://www.instagram.com/",
            messenger: `fb-messenger://share/?link=${postUrl}`,
            twitter: `https://twitter.com/intent/tweet?url=${postUrl}`,
        };
    };

    if (loading) {
        return (
            <div
                className="min-h-screen pt-28 flex justify-center items-center"
                style={{
                    backgroundColor: "#1a1a1a",
                }}
            >
                <h1 className="text-white text-xl">Loading...</h1>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div
                className="min-h-screen pt-28 flex justify-center items-center"
                style={{
                    backgroundColor: "#1a1a1a",
                }}
            >
                <h1 className="text-white text-xl">No public posts available.</h1>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen pt-28 p-4 flex justify-center items-start"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                backgroundBlendMode: "overlay",
                backgroundColor: "#1a1a1a",
            }}
        >
            <Container>
                <div className="flex flex-col gap-8 items-center max-w-xl mx-auto w-full">
                    {posts.map((post) => (
                        <div key={post.$id} className="w-full  bg-gray-800/800 backdrop-blur-sm border border-gray-400 hover:border-gray-200 rounded-xl shadow hover:shadow-md transition p-4">
                            <PostCard {...post} />
                            
                            {/* Like, Comment, Share Buttons */}
                            <div className="flex gap-3 text-sm flex-wrap justify-center mt-4">
                                {/* Like Button */}
                                <button
                                    onClick={() => handleLike(post.$id)}
                                    className={`flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-2xl transition-all duration-200 text-xs ${
                                        likedStates[post.$id] ? "text-blue-500" : "text-white"
                                    }`}
                                >
                                    <FaThumbsUp size={14} /> {likeCounts[post.$id]}
                                </button>

                                {/* Comment Button */}
                                <button
                                    onClick={() => setShowInputStates(prev => ({
                                        ...prev,
                                        [post.$id]: !prev[post.$id]
                                    }))}
                                    className="flex items-center  gap-2 text-white border border-gray-600 rounded-2xl px-4 py-2 text-xs"
                                >
                                    <FaRegComment size={14} />
                                </button>

                                {/* Share Button */}
                                <div className="relative" ref={el => shareMenuRefs.current[post.$id] = el}>
                                    <button
                                        onClick={() => toggleShareMenu(post.$id)}
                                        className="flex items-center gap-2 px-4 py-2 text-white border border-gray-600 rounded-2xl text-xs"
                                    >
                                        <FaShare size={14} />
                                    </button>
                                    {activeShareMenu === post.$id && (
                                        <div className="absolute top-full mt-2 right-0 flex gap-3 bg-gray-900 border border-gray-700 p-2 rounded-lg shadow-lg z-50">
                                            <a href={getShareLinks(post.$id).facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:scale-110 transition-transform">
                                                <FaFacebook size={18} />
                                            </a>
                                            <a href={getShareLinks(post.$id).whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:scale-110 transition-transform">
                                                <FaWhatsapp size={18} />
                                            </a>
                                            <a href={getShareLinks(post.$id).instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:scale-110 transition-transform">
                                                <FaInstagram size={18} />
                                            </a>
                                            <a href={getShareLinks(post.$id).messenger} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:scale-110 transition-transform">
                                                <FaFacebookMessenger size={18} />
                                            </a>
                                            <a href={getShareLinks(post.$id).twitter} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:scale-110 transition-transform">
                                                <FaTwitter size={18} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Comment Input */}
                          {showInputStates[post.$id] && (
    <form
        ref={el => commentBoxRefs.current[post.$id] = el}
        onSubmit={(e) => handleCommentSubmit(e, post.$id)}
        className="flex items-center justify-center gap-2 w-full mt-4"  // Added justify-center here
    >
        <div className="w-full max-w-md rounded-2xl border border-white p-2 flex items-center gap-2">
            <input
                type="text"
                value={comments[post.$id]}
                onChange={(e) => setComments(prev => ({
                    ...prev,
                    [post.$id]: e.target.value
                }))}
                placeholder="Write your comment..."
                className="w-full bg-transparent text-white focus:outline-none px-2"
                autoFocus
            />
            <button type="submit">
                <img className="h-5 w-5" src={send} alt="send" />
            </button>
        </div>
    </form>
)}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;