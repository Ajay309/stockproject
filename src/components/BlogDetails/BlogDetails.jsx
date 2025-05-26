// src/components/BlogDetails.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const BlogDetails = () => {
  const { state } = useLocation();
  const blog = state?.blog;

  if (!blog) {
    return <p>No blog data found.</p>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-3">{blog.name}</h2>
      <img src={blog.image} alt={blog.name} className="img-fluid mb-4" />
      <p className="text-muted">{blog.created_at}</p>
      <p>{blog.description}</p>
    </div>
  );
};

export default BlogDetails;
