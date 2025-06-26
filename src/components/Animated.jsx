import React from 'react';

/**
 * Animated wrapper for AOS scroll animations.
 * @param {string} animation - AOS animation type (default: 'fade-up')
 * @param {number} delay - Animation delay in ms (default: 100)
 * @param {object} rest - Other props (e.g., className)
 */
const Animated = ({ children, animation = 'fade-up', delay = 100, ...rest }) => (
  <div data-aos={animation} data-aos-delay={delay} {...rest}>
    {children}
  </div>
);

export default Animated; 