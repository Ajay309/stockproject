import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './BlogsSection.css';

const blogPosts = [
  {
    title: 'Understanding React Hooks',
    image: './assets/blogs/b1.jpg',
    date: 'May 5, 2025',
    description: 'Learn how React hooks work and how to use them effectively in your React applications.',
  },
  {
    title: 'State Management in React',
    image: './assets/blogs/b2.jpg',
    date: 'April 28, 2025',
    description: 'A guide to managing state in your React apps, including useState, useReducer, and context API.',
  },
  {
    title: 'Building REST APIs with Laravel',
    image: './assets/blogs/b3.webp',
    date: 'April 20, 2025',
    description: 'Explore the steps to create RESTful APIs using Laravel and best practices for API design.',
  },
  {
    title: 'Next.js vs React – Key Differences',
    image: './assets/blogs/b4.webp',
    date: 'April 10, 2025',
    description: 'A deep dive into the differences between Next.js and React and when to use each.',
  },
  {
    title: 'Understanding Tailwind CSS',
    image: './assets/blogs/b5.webp',
    date: 'March 30, 2025',
    description: 'Master the basics of Tailwind CSS and how it can simplify your frontend development.',
  },
  {
    title: 'Node.js Authentication Techniques',
    image: './assets/blogs/b6.jpg',
    date: 'March 15, 2025',
    description: 'Learn about different authentication methods in Node.js for securing your applications.',
  },
  
];

const BlogsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const blogsPerPage = 3;

  const pageCount = Math.ceil(blogPosts.length / blogsPerPage);

  const currentBlogs = blogPosts.slice(
    currentPage * blogsPerPage,
    currentPage * blogsPerPage + blogsPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
// const [searchTerm, setSearchTerm] = useState('');

//   const filteredBlogs = blogPosts.filter(blog =>
//     blogPosts.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     blogPosts.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  return (
    <div className="container py-5">
      <h2 className="display-4 mb-4 text-start text-black">Our Blogs</h2>
      
      <div className="row">
        {currentBlogs.map((blog, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card blog-card">
              <img src={blog.image} className="card-img-top" alt={blog.title} />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text text-muted small">{blog.date} | {blog.category}</p>
                <p className="card-text">{blog.excerpt}</p>
                <button className="btn btn-warning rounded-pill">Read More</button>
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
