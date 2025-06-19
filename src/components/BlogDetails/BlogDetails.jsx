// src/components/BlogDetails.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './BlogDetails.css'; // Import your CSS file for styling

const BlogDetails = () => {
  const { state } = useLocation();
  const blog = state?.blog;

  if (!blog) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-danger">No blog data found.</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="bg-white rounded-3 shadow p-4 p-md-5">
        <h1 className="mb-3 fw-bold text-dark">{blog.name}</h1>

        <p className="text-secondary mb-4">
          Published on <strong>{new Date(blog.created_at).toLocaleDateString()}</strong>
        </p>

        <img
          src={blog.image}
          alt={blog.name}
          className="img-fluid rounded-3 shadow-sm mb-4"
          style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
        />

        <div className="blog-description">
          <div dangerouslySetInnerHTML={{ __html: blog.description }} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
