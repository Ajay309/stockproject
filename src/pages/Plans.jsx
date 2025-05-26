import React from 'react'
import PlansSection from '../components/Plans/PlansSection';
import FaqSection from '../components/Faq/FaqSection';
import Footer from '../components/Footer/Footer';
import EnquiryForm from './EnquiryForm';

export default function Plans () {
  return (
<>
        <div className="pt-5">
<PlansSection/>
<FaqSection/>
<EnquiryForm/>
<Footer/>
        </div>

</>
       );
}

