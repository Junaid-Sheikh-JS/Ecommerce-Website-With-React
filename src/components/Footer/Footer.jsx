import React from "react";
import "./Footer.scss";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import Payment from "../../assets/payments.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="col col-1">
                    <div className="title"><h1>About</h1></div>
                    <div className=" about-text">
                        Welcome to Fashion & Gadget Store, where quality meets convenience. We specialize in offering a curated selection of Men or Women Watches and Airpods, each chosen for its exceptional quality and value. Our mission is to provide you with a seamless shopping experience, combining outstanding customer service with top-notch products. At F&G Store, we're dedicated to helping you find exactly what you need, with fast shipping and hassle-free returns. Thank you for choosing us for your specific needs or interests!
                    </div>
                </div>
                <div className="col col-2">
                    <div className="title"><h1>Contact</h1></div>
                    <div className="c-item">
                        <FaLocationArrow />
                        <div className="text">
                            Kayaloram Rd, Punnamada, Kottankulangara, Alappuzha,
                            Kerala, 688006
                        </div>
                    </div>
                    <div className="c-item">
                        <FaMobileAlt />
                        <div className="text">Phone: 0471 272 0261</div>
                    </div>
                    <div className="c-item">
                        <FaEnvelope />
                        <div className="text">Email: store@jsdev.com</div>
                    </div>
                </div>
                {/* <div className="col col-3">
                    <div className="title"> <h1> Categories </h1> </div>
                    <span className="text">Headphones</span>
                    <span className="text">Smart Watches</span>
                    <span className="text">Bluetooth Speakers</span>
                    <span className="text">Wireless Earbuds</span>
                    <span className="text">Home Theatre</span>
                    <span className="text">Projectors</span>
                </div> */}
                <div className="col col-4">
                    <div className="title"> <h1> Pages </h1> </div>
                    <span className="text" onClick={() => navigate("/")}>Home</span>
                    <span className="text">About</span>
                    <span className="text" onClick={() => navigate("/privacy-policy")}>Privacy Policy</span>
                    <span className="text" onClick={() => navigate("/returns")}>Returns</span>
                    <span className="text" onClick={() => navigate("/terms-conditions")}>Terms & Conditions</span>
                    <span className="text" onClick={() => navigate("/contact")}>Contact Us</span>
                </div>
            </div>
            <div className="bottom-bar col-5">
                <div className="bottom-bar-content">
                    <span className="text">
                        F&G|STORE 2024 CREATED BY JS DEV. PREMIUM E-COMMERCE
                        SOLUTIONS.
                    </span>
                    <img src={Payment} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Footer;