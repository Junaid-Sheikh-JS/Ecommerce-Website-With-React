import React, { useState } from "react";
import axios from "axios";
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./Contact.scss";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleWhatsAppClick = () => {
    const phoneNumber = "1234567890"; // Replace with your WhatsApp number
    const message = "Hello, I would like to chat with you.";
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log the data being sent
    console.log("Submitting form with data:", {
      name,
      email,
      message,
      phone
    });

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact-submissions`, {
        data: { // Wrap the payload in a `data` object
          name,
          email,
          message,
          phnNumber: phone // Use the correct field name
        }
      }, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      console.log("Form submitted successfully:", response.data);
      setSubmissionStatus("Thank you for reaching out! Your message has been received and will be reviewed shortly.");
      setName(""); // Clear the input fields after successful submission
      setEmail("");
      setMessage("");
      setPhone("");
    } catch (error) {
      console.error("Error submitting form:", error.response ? error.response.data : error.message);
      setSubmissionStatus("Oops! Something went wrong. Please try again.");
    }
  };


  return (
    <div className="contact-page">
      <div className="container">
        <h1>CONTACT US</h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">SUBMIT</button>
        </form>
        {submissionStatus && <p className="submission-status">{submissionStatus}</p>}




        <div className="social-media-links">
          <h2>Follow Us</h2>
          <div className="icons">
            <a
              href="https://www.facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={30} />
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={30} />
            </a>
            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={30} />
            </a>
            <button className="whatsapp-button" onClick={handleWhatsAppClick}>
              <FaWhatsapp size={30} color="#25D366" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
