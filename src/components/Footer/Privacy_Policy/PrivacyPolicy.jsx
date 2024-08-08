import React from "react";
import "./PrivacyPolicy.scss";

const Privacy_Policy = () => {
    return (
        <div className="privacy-container">
            <div className="privacy-header">
                <h1>Privacy Policy</h1>
            </div>
            <div className="privacy-body">

                <div className="section main-sec">
                    <p>This Privacy Policy describes how F&G Store (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from dnstore.pk (the "Site") or otherwise communicate with us (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy. </p> <br />

                    <p> Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services.</p>
                </div>


                <div className="section">
                    <h2>Information We Collect</h2>
                    <p> We collect various types of information in connection with the services we provide, including:</p>

                    <ul>
                        <li>Personal identification information (Name, email address, phone number, etc.)</li>
                        <li>Order details and transaction history</li>
                        <li>Cookies and usage data</li>
                    </ul>

                    <h2>How We Use Your Information</h2>
                    <p>The information we collect is used in the following ways: </p>
                    <ul>
                        <li>To process your orders and manage your account</li>
                        <li>To improve our website and services</li>
                        <li>To send you promotional emails and offers</li>
                        <li>To comply with legal obligations</li>
                    </ul>
                </div>


                <div className="section">
                    <h2>How We Protect Your Information</h2>
                    <p> We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.  </p>
                </div>


                <div className="section">
                    <h2>Sharing Your Information</h2>
                    <p> We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information except in the following situations:   </p>
                    <ul>
                        <li>With trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential</li>
                        <li>When we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety</li>
                    </ul>
                </div>

                <div className="section">
                    <h2>Cookies</h2>
                    <p>  We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interactions so that we can offer better site experiences and tools in the future. </p>     </div>


                <div className="section">
                    <h2>Your Consent</h2>
                    <p>
                        By using our site, you consent to our privacy policy.
                    </p>

                </div>

                <div className="section">
                    <h2>Changes to Our Privacy Policy</h2>
                    <p> We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

                </div>


                <div className="section">
                    <h2>Contact Us</h2>
                    <p> If you have any questions about this Privacy Policy, please contact us at support@dnstore.com.</p>
                </div>
            </div>
        </div>
    );
};

export default Privacy_Policy;
