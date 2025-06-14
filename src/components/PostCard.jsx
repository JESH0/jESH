import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, imageUrl }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-800/800 backdrop-blur-sm border  rounded-xl shadow hover:shadow-md transition p-4">
        <div className="w-full aspect-[4/3] bg-gray-200 rounded-md mb-4 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Images
            </div>
          )}
        </div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
