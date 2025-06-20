// src/components/BlogDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetails.css';

const BlogDetail = () => {
  const { id } = useParams(); // this is blog_key
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://dtc.sinfode.com/api/v1/blog-detail/${id}`);
        const result = await response.json();
        if (result.status === 'success') {
          setBlog(result.data);
        } else {
          setError('Blog not found.');
        }
      } catch (err) {
        setError('Failed to fetch blog.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="container py-5 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container py-5 text-center text-danger">{error}</div>;
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

export default BlogDetail;
