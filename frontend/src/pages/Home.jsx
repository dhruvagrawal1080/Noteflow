import React from 'react';
import Footer from '../components/Footer';
import HomeComponent from '../components/HomeComponent';


const Home = () => {
  return (
    <div className="h-[calc(100vh-3.5rem)] overflow-auto bg-white">

      <HomeComponent />

      <Footer />

    </div>
  )
}

export default Home

