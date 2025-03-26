import React from 'react';
import AboutComponent from '../components/AboutComponent';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-auto bg-white">

      <AboutComponent />

      <Footer />

    </div>
  );
};

export default About;
