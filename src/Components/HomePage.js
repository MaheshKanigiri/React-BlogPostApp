import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Styles/HomePage.module.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      <Link to="/add-post">
        <button className={styles.addButton}>Add Post</button>
      </Link>
      <div className={styles.postListContainer}>
        <ul className={styles.postList}>
          {posts.map(post => (
            <li key={post.id} className={styles.postItem}>
              <Link to={`/post/${post.id}`} className={styles.postLink}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
