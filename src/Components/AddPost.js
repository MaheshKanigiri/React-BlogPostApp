import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from './Styles/AddPost.module.css'

const AddPost = () => {
  const initialValues = {
    title: '',
    body: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    body: Yup.string().required('Required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    axios.post('https://jsonplaceholder.typicode.com/posts', values)
      .then(() => {
        setSubmitting(false);
        alert('Post added successfully');
      })
      .catch(error => {
        console.error('Error adding post:', error);
        setSubmitting(false);
      });
  };

  return (
    <div className={styles.container}>
      <h2>Add New Post</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="title">Title:</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="div" className={styles.error} />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="body">Body:</label>
            <Field as="textarea" id="body" name="body" />
            <ErrorMessage name="body" component="div" className={styles.error} />
          </div>
          <button type="submit" className={styles.submitButton}>Add Post</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddPost;
