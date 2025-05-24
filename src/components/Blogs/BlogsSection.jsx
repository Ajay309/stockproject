// src/components/BlogsSection.js
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import api from '../../api';
import './BlogsSection.css';
import axios from 'axios';


const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const blogsPerPage = 3;
  const pageCount = Math.ceil(blogs.length / blogsPerPage);

  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/blog')
      .then(response => {
        console.log(response.data.data);
        setBlogs(response.data.data); // assuming API returns { data: [...] }
      })
      .catch(error => {
        console.error('Error fetching FAQs:', error);
      });
  }, []);


  const currentBlogs = blogs.slice(
    currentPage * blogsPerPage,
    currentPage * blogsPerPage + blogsPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="container py-5">
      <h2 className="display-4 mb-4 text-start text-black">Our Blogs</h2>
      <div className="row">
        {currentBlogs.map((blog, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card blog-card">
              <img src={blog.image} className="card-img-top" alt={blog.image} />
              <div className="card-body">
                <h5 className="card-title">{blog.name}</h5>
                <p className="card-text text-muted small">{blog.created_at}</p>
                <p className="card-text">{blog.blog_key}</p>
                <button className="btn btn-primary rounded-pill">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        previousLinkClassName={'pagination-link'}
        nextLinkClassName={'pagination-link'}
        disabledClassName={'pagination-disabled'}
        activeClassName={'pagination-active'}
      />
    </div>
  );
};

export default BlogsSection;
