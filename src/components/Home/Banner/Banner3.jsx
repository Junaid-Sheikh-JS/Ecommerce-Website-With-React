import React from "react";
import "./Banner3.scss"
import BannerImg3 from "../../../assets/banner-img.png";

const Banner3 = () => {
  return (
    <div className="hero-banner banner3">
      <div className="content">
        <div className="text-content">
          <h1>New Arrivals</h1>
          <p>
            Check out our newest products and be the first to get your hands on the latest trends.
          </p>
          <div className="ctas">
            <div className="banner-cta">See New Arrivals</div>
            <div className="banner-cta v2">Shop Now</div>
          </div>
        </div>
        <img className="banner-img" src={BannerImg3} alt="New Arrivals" />
      </div>
    </div>
  );
};

export default Banner3;
