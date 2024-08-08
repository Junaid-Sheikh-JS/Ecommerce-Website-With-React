import React from "react";

import "./Banner.scss";
import BannerImg from "../../../assets/banner-img.png";
import { useNavigate } from "react-router-dom";

const Banner = () => {
const navigate = useNavigate();

  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content">
          <h1>Premium Sound Experience</h1>
          <p>
          Immerse yourself in high-fidelity audio with our top-of-the-line headphones. Enjoy crystal clear sound quality, noise cancellation, and unparalleled comfort for the ultimate listening experience.
          </p>
          <div className="ctas">
            <div className="banner-cta" onClick={() => navigate("/")}>Read More</div>
            <div className="banner-cta v2" onClick={() => navigate("/catalog")}>Shop Now</div>
          </div>
        </div>
        <img className="banner-img" src={BannerImg} alt="" />
      </div>
    </div>
  );
};

export default Banner;

