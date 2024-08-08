import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel CSS

import Banner from './Banner';
import Banner2 from './Banner2';
// import Banner3 from './Banner3'; 

const MyCarousel = () => {
  return (
    <Carousel
      autoPlay={true}       // Enable automatic sliding
      interval={3000}       // Set the interval between slides (in milliseconds)
      infiniteLoop={true}   // Loop back to the first slide after reaching the end
      showArrows={true}     // Show navigation arrows
      showStatus={false}    // Hide status (e.g., slide numbers)
      showIndicators={true} // Show indicators (e.g., dots)
    transitionTime={500} // Time for transition between slides (in milliseconds)
    >
      <div className="banner-wrapper">
        <Banner2 />
      </div>
      <div className="banner-wrapper">
        <Banner />
      </div>
      {/* <div className="banner-wrapper banner-3">
        <Banner3 />
      </div> */}
    </Carousel>
  );
};

export default MyCarousel;

