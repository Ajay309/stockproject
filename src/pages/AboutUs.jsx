import React from 'react'
import Footer from '../components/Footer/Footer'
import AboutUsSection from '../components/AboutUsSection/AboutUsSection'
import Animated from '../components/Animated.jsx';

export default function ContactUs ()  {
  return (
    <>
    <div className="container-fluid py-5">
      <Animated animation="fade-up" delay={100}>
        <AboutUsSection />
      </Animated>
    </div>
    <Footer/>
    </>
  )
}
