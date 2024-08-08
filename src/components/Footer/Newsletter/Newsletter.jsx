import React, { useState } from "react";
import axios from "axios";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaWhatsapp,
} from "react-icons/fa";
import "./Newsletter.scss";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/subscriptions`, {
                data: { email: email },
            });
            console.log("Email subscribed successfully:", response.data);
            setSuccessMessage("You have been subscribed to our newsletter");
            setEmail("");

            setTimeout(() => {
                setSuccessMessage("");
            }, 10000);
        } catch (error) {
            console.error("Error subscribing email:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="newsletter-section">
            <div className="newsletter-content">
                <span className="small-text">Newsletter</span>
                <span className="big-text">Sign up for latest updates and offers</span>
                <form className="form" onSubmit={handleFormSubmit}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Subscribe</button>
                </form>
                {successMessage && <div className="success-message">{successMessage}</div>}
                <span className="text">Will be used in accordance with our Privacy Policy</span>
                <span className="social-icons">
                    <div className="icon"><FaFacebookF size={14} /></div>
                    <div className="icon"><FaInstagram size={14} /></div>
                    <div className="icon"><FaTwitter size={14} /></div>
                    <div className="icon"><FaWhatsapp size={14} /></div>
                </span>
            </div>
        </div>
    );
};

export default Newsletter;
