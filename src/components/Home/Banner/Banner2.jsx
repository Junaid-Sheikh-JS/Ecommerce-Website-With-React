import React from "react";
import "./Banner2.scss";
import BannerImg from "../../../assets/image_2N5.webp";
import { useNavigate } from "react-router-dom";

const Banner2 = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-banner banner2">
      <div className="content">
        <div className="text-content">
          <h1>Exclusive Offers</h1>
          <p>
            Discover unbeatable deals on your favorite products. Don't miss out on these limited-time offers.
          </p>
          <div className="ctas">
            <div className="banner-cta" onClick={() => navigate("/")}>Explore Offers</div>
            <div className="banner-cta v2" onClick={() => navigate("/catalog")}>Shop Now</div>
          </div>
        </div>
        <img className="banner-img" src={BannerImg} alt="Exclusive Offers" />
      </div>
    </div>
  );
};

export default Banner2;
