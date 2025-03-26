import React from 'react';
import ContactComponent from '../components/ContactComponent';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-auto bg-gray-100">

      <ContactComponent />

      <Footer />

    </div>
  );
};

export default Contact;

