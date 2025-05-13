import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FaqSection.css';

const faqs = [
    {
        question: 'What is the return policy?',
        answer: 'Our return policy allows you to return items within 30 days of purchase.'
    },
    {
        question: 'How do I track my order?',
        answer: 'You can track your order by logging into your account and visiting the order history page.'
    },
    {
        question: 'What payment methods are accepted?',
        answer: 'We accept all major credit cards, PayPal, and Apple Pay.'
    },
    {
        question: 'How do I contact customer support?',
        answer: 'You can reach our support team via the contact form or call our support line 24/7.'
    }
];

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-5 bg-light">
            <div className="container">
                <div className="row">
                <h2 className="heading-1 mb-5  display-4">Frequently Asked Questions</h2>
                    <div className="col-lg-10 mx-auto">
                <div className="accordion " id="faqAccordion">
                    {faqs.map((faq, index) => (
                        <div className="accordion-item border-0 rounded-3 shadow-sm mb-4  overflow-hidden" key={index}>
                            <h2 className="accordion-header heading-224" id={`heading${index}`}>
                                <button className="accordion-button text-dark bg-white rounded-3 shadow-sm" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded={activeIndex === index} aria-controls={`collapse${index}`} onClick={() => toggleFAQ(index)}>
                                    {faq.question}
                                </button>
                            </h2>
                            <div id={`collapse${index}`} className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`} aria-labelledby={`heading${index}`} data-bs-parent="#faqAccordion">
                                <div className="accordion-body heading-223">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
