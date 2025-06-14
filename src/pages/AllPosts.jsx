    import React, { useEffect, useState } from "react";
    import AppwriteService from "../appwrite/config";
    import { Container, PostCard } from "../components";
    import { useSelector } from "react-redux";

    const AllPosts = () => {
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(true);
        const userData = useSelector((state) => state.auth.userData);

        useEffect(() => {
            if (userData?.$id) {
                setLoading(true);
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
        }, [userData?.$id]);

        const baseStyle = {
            backgroundImage: "url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundBlendMode: "overlay",
            backgroundColor: "#1a1a1a", // fallback for flash
        };

        if (loading) {
            return (
                <div className="min-h-screen pt-28 flex items-center justify-center" style={baseStyle}>
                    <h1 className="text-white text-xl">Loading posts...</h1>
                </div>
            );
        }

        if (posts.length === 0) {
            return (
                <div className="min-h-screen pt-28 flex items-center justify-center" style={baseStyle}>
                    <h1 className="text-white text-xl">No posts created yet.</h1>
                </div>
            );
        }

        return (
              <div className="min-h-screen pt-28 p-4 flex items-start justify-center" style={baseStyle}>
        <Container>
            <div className="flex flex-wrap gap-4 py-2 px-2 justify-center">
                {posts.map((post) => (
                    <div key={post.$id} className="w-22 sm:w-40 md:w-48">
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
        );
    };

    export default AllPosts;
