import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Styles/PostDetail.module.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div className={styles.container}>
      {post ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default PostDetail;
