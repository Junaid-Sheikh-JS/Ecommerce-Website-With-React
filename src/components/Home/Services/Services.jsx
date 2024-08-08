import React from 'react';
import './Services.scss';

const Services = () => {
    return (
        <div className="container">
            <div className="content">
                <div className="section">
                    <div className="icon-box">
                        <i className="fa fa-truck"></i>
                    </div>
                    <div className="text-box">
                        <h3>FREE SHIPPING</h3>
                        <p>Hassle Free Shipping All Over Pakistan</p>
                    </div>
                </div>
                <div className="section">
                    <div className="icon-box">
                        <i className="fa fa-phone"></i>
                    </div>
                    <div className="text-box">
                        <h3>CUSTOMER SERVICE</h3>
                        <p>We are available 24/7 to answer your questions.</p>
                    </div>
                </div>
                <div className="section">
                    <div className="icon-box">
                        <i className="fa fa-lock"></i>
                    </div>
                    <div className="text-box">
                        <h3>SECURE PAYMENT</h3>
                        <p>Your payment information is processed securely.</p>
                    </div>
                </div>
                <div className="section">
                    <div className="icon-box">
                        <i className="fa fa-phone"></i>
                    </div>
                    <div className="text-box">
                        <h3>CONTACT US</h3>
                        <p>Need to contact us ? Just send us an e-mail at</p>
                        <p>f&gstore@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Services;