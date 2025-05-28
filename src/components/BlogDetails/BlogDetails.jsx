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
    <div className="container my-5">
      <h2 className="mb-3">{blog.name}</h2>

      <img
        src={blog.image}
        alt={blog.name}
        className="img-fluid rounded shadow-sm mb-4"
        style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
      />

      <p className="text-muted mb-2">
        {new Date(blog.created_at).toLocaleDateString()}
      </p>

      <div className="fs-5" style={{ whiteSpace: 'pre-line' }}>
                  <div dangerouslySetInnerHTML={{ __html: blog.description }} />
      </div>
    </div>
  );
};


export default BlogDetails;
