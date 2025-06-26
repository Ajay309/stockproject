// src/components/FaqSection.js
import React, { useEffect, useState } from 'react';
import { getFaqs } from '../../api';
import './FaqSection.css';
import Animated from '../Animated';

const FaqSection = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      const data = await getFaqs();
      setFaqs(data);
    };
    fetchFaqs();
  }, []);

  return (
    <div className="container py-5 faq-custom-style">
      <div className="row">
        <div className="col-12">
          <Animated animation="fade-up" delay={100}>
            <h2 className="faq-heading text-center mb-5">Frequently Asked Questions</h2>
          </Animated>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-2">
        {faqs.map((faq, index) => (
          <Animated key={faq.id} animation="fade-up" delay={100 + index * 100}>
            <div className="col">
              <div className="accordion" id={`faqAccordion-${index}`}>
                <div className="accordion-item">
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse${index}`}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent={`#faqAccordion-${index}`}
                  >
                    <div
                      className="accordion-body"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </Animated>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
