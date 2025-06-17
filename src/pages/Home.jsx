import React from 'react';
import HeaderSection from '../components/HeaderSection/Header';
import FeaturesSection from '../components/FeatureSection/FeatureSection';
import Process from '../components/process/Process';
import FaqSection from '../components/Faq/FaqSection';
import ReviewsSection from '../components/ReviewsSection/ReviewsSection';
import Footer from '../components/Footer/Footer';
import EnquiryForm from './EnquiryForm';
import PlansSection from '../components/Plans/PlansSection';
import VideoSection from '../components/VideoSection.jsx/VideoSection';
import CommunitySection from '../components/OurCommunitySection/OurCommunitySection';

export default function Home() {
  return (
    <>
      <div className="">
        <HeaderSection />
      </div>
      <div className="with-navbar-padding">
        <FeaturesSection />
      </div>
      <div className="">
        <VideoSection/>
      </div>
      

      <div className="container-fluid">
        <Process />
      </div>
      <div className="container-fluid">
        <ReviewsSection />
      </div>
      <div className="container-fluid">
        <CommunitySection/>
      </div>
      <div className="container-fluid">
        <PlansSection />
      </div>
      <div className="container-fluid py-3">
        <FaqSection />
      </div>
      <EnquiryForm />
      <Footer />
    </>
  );
}
