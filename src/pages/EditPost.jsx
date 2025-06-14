import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import AppwriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams(); // ✅ get post ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      AppwriteService.getPost(id).then((fetchedPost) => {
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          navigate('/');
        }
      });
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} /> {/* ✅ send post to PostForm */}
      </Container>
    </div>
  ) : null;
};

export default EditPost;
