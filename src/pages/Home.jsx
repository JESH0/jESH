
import React, { useEffect, useState } from "react";
import AppwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

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
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center bg-gray-800/800 backdrop-blur-mdk">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl text-white font-bold hover:text-gray-500">
                                Loading...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center bg-gray-800/800 backdrop-blur-mdk">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-xl text-white">No public posts available.</h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
                 <div 
      className="flex items-center justify-center min-h-screen p-4"
       style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
   
        backgroundBlendMode: "overlay"
      }}
    > 
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;
