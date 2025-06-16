// src/components/FaqSection.js
import React, { useEffect, useState } from 'react';
import { getFaqs } from '../../api';
import './FaqSection.css';

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
      <div className="row align-items-start">
        <div className="col-md-5">
          <h2 className="faq-heading">Frequently Asked Questions</h2>
        </div>
        <div className="col-md-7">
          <div className="accordion" id="faqAccordion">
            {faqs.map((faq, index) => (
              <div className="accordion-item" key={index}>
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
                  data-bs-parent="#faqAccordion"
                >
                  <div
                    className="accordion-body"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
