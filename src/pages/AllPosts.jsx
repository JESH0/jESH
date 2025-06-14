import React, { useEffect, useState } from "react";
import AppwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const userData = useSelector((state) => state.auth.userData); // ✅ Get logged-in user

    useEffect(() => {
        // ✅ Only fetch posts if user is logged in
        if (userData?.$id) {
            setLoading(true); // ✅ Show loading UI on user change or re-fetch
            AppwriteService.getPosts(userData.$id).then((posts) => {
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
                } else {
                    setPosts([]);
                }
                setLoading(false);
            });
        }
    }, [userData?.$id]); // ✅ Will re-run when user logs in

    // ✅ Show loading UI
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center bg-gray-800/800 backdrop-blur-md">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl text-white font-bold hover:text-gray-500">
                                Loading posts...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // ✅ Show empty state
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center bg-gray-800/800 backdrop-blur-md">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-xl text-white">No posts created yet.</h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // ✅ Show posts
    return (
        <div className="w-full py-8 bg-gray-800/800 backdrop-blur-md">
            <Container>
                <div className="flex flex-col items-center justify-center">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-2/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPosts;
