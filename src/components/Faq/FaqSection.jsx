import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FaqSection = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    axios.get('https://dtc.sinfode.com/api/v1/faq-data')
      .then(response => {
        setFaqs(response.data.data); // assuming API returns { data: [...] }
      })
      .catch(error => {
        console.error('Error fetching FAQs:', error);
      });
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}>
                {faq.question}
              </button>
            </h2>
            <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
              <div className="accordion-body" dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
