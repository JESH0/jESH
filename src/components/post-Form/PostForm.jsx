import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
        mode: "onChange"
    });

    useEffect(() => {
        if (post?.featuredimage) {
            const url = appwriteService.getFileView(post.featuredimage);
            if (url) setImagePreviewUrl(url);
        }
    }, [post]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "image" && value.image?.[0]) {
                const file = value.image[0];
                const preview = URL.createObjectURL(file);
                setImagePreviewUrl(preview);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const submit = async (data) => {
        try {
            if (!userData?.$id) {
                alert("Please login first.");
                return;
            }

            let file = null;

            if (data.image?.[0]) {
                const uploaded = await appwriteService.uploadFile(data.image[0]);
                if (!uploaded || !uploaded.$id) {
                    alert("Image upload failed.");
                    return;
                }
                file = uploaded;

                if (post?.featuredimage) {
                    await appwriteService.deleteFile(post.featuredimage);
                }
            } else if (!post) {
                alert("Please upload an image.");
                return;
            }

            const postPayload = {
                ...data,
                featuredimage: file ? file.$id : post?.featuredimage,
            };

            const dbPost = post
                ? await appwriteService.updatePost(post.$id, postPayload)
                : await appwriteService.createPost({ ...postPayload, userid: userData.$id });

            if (dbPost) navigate(`/post/${dbPost.$id}`);
        } catch (error) {
            console.error("Submit error:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        return value?.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s+/g, "-") || "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

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
            <form onSubmit={handleSubmit(submit)}  className="w-full  max-w-4xl  mx-auto bg-red-800/800 backdrop-blur-md rounded-xl shadow-md overflow-hidden p-6 sm:p-8 md:p-10 border border-gray-600">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-2/3 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-300">Title:</label>
                            <Input
                             className="text-white !bg-transparent !bg-none border-0 border-b border-gray-400 focus:border-blue-500 rounded-none px-0 shadow-none outline-none [background:none] [&>input]:bg-transparent pr-8"
                                placeholder="Post title"
                                {...register("title", { required: true })}
                        
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-300">Slug:</label>
                            <Input
                                {...register("slug", { required: true })}
                                onInput={(e) => {
                                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                }}
                             className="text-white !bg-transparent !bg-none border-0 border-b border-gray-400 focus:border-blue-500 rounded-none px-0 shadow-none outline-none [background:none] [&>input]:bg-transparent pr-8"
                            />
                        </div>

                        <div>
                            <label className="text-white !bg-transparent !bg-none border-0 border-b border-gray-400 focus:border-blue-500 rounded-none px-0 shadow-none outline-none [background:none] [&>input]:bg-transparent pr-8">Content:</label>
                            <div   className="text-white !bg-transparent !bg-none border-0 border-b border-gray-400 focus:border-blue-500 rounded-none px-0 shadow-none outline-none [background:none] [&>input]:bg-transparent pr-8">
                                <RTE
                                 className="text-white !bg-transparent !bg-none border-0 border-b border-gray-400 focus:border-blue-500 rounded-none px-0 shadow-none outline-none [background:none] [&>input]:bg-transparent pr-8"
                                    name="content"
                                    control={control}
                                    defaultValue={getValues("content")}
                                    darkMode={true}
                                    rules={{ required: "Content is required" }}
                                />
                            </div>
                            {errors.content && (
                                <p className="text-sm text-red-500">{errors.content.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-300">Featured Image</label>
                            <label htmlFor="image-upload" className="block cursor-pointer">
                                {imagePreviewUrl ? (
                                    <img src={imagePreviewUrl} alt="Preview" className="w-full h-48 object-cover rounded-md" />
                                ) : (
                                    <div className="w-full h-48 border border-dashed border-gray-700 flex items-center justify-center text-gray-400 bg-gray-800/800 backdrop-blur-2xl rounded-md">
                                        Click to upload image
                                    </div>
                                )}
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    {...register("image", { required: !post })}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-300">Status</label>
                            <Select
                             className="text-white !bg-transparent !bg-none border-0 border-b border-gray-400 focus:border-blue-500 rounded-none px-0 shadow-none outline-none [background:none] [&>input]:bg-transparent pr-8"
                                options={["active", "inactive" ] }
                                {...register("status", { required: true })}
                              
                                darkMode={true}
                            />
                        </div>

                        <Button
                            type="submit"
                            className={post ? "bg-green-600 hover:bg-green-700" : "bg-white hover:bg-gray-200"}
                      
                        >
                            {post ? "Update Post" : "Publish Post"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
