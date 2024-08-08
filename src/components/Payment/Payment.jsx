import React, { useState } from "react";
import "./Payment.scss";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import Cart from "../Cart/Cart";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleTitleClick = () => {
    navigate("/"); // Navigate to the home page
  };

  const [showCart, setShowCart] = useState(false);
  const { setCartItems, cartItems, cartSubTotal } = useCart();
  const [contactInfo, setContactInfo] = useState({ email: "", subscribe: false });
  const [deliveryInfo, setDeliveryInfo] = useState({
    country: "Pakistan",
    firstName: "",
    lastName: "",
    address: "",
    apartmentSuite: "",
    city: "",
    postalCode: "",
    phone: "",
    saveInfo: false,
  });
  const [paymentMethod, setPaymentMethod] = useState("bank-deposit");
  const [errors, setErrors] = useState({});

  const handleContactChange = (event) => {
    const { name, value, type, checked } = event.target;
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDeliveryChange = (event) => {
    const { name, value, type, checked } = event.target;
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!contactInfo.email) newErrors.email = "Email is required";
    if (!deliveryInfo.firstName) newErrors.firstName = "First name is required";
    if (!deliveryInfo.lastName) newErrors.lastName = "Last name is required";
    if (!deliveryInfo.address) newErrors.address = "Address is required";
    if (!deliveryInfo.city) newErrors.city = "City is required";
    if (!deliveryInfo.phone) newErrors.phone = "Phone is required";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      // Prepare data for Strapi
      const contactData = {
        email: contactInfo.email,
        subscribe: contactInfo.subscribe,
      };

      const deliveryData = {
        country: deliveryInfo.country,
        firstName: deliveryInfo.firstName,
        lastName: deliveryInfo.lastName,
        address: deliveryInfo.address,
        apartmentSuite: deliveryInfo.apartmentSuite,
        city: deliveryInfo.city,
        postalCode: deliveryInfo.postalCode,
        phone: deliveryInfo.phone,
        saveInfo: deliveryInfo.saveInfo,
      };

      const checkoutItemsData = cartItems.map(item => ({
        data: {
          title: item.attributes.title,
          quantity: item.attributes.quantity,
          price: item.attributes.price,
          imageUrl: item.attributes.img.data[0]?.attributes.url || '',
        }
      }));

      // Get the authorization token from environment variable
      const token = process.env.REACT_APP_API_KEY; // Ensure this is set in your .env file

      // Example POST request for contacts
      await axios.post(`${process.env.REACT_APP_API_URL}/contacts`, { data: contactData }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Example POST request for deliveries
      await axios.post(`${process.env.REACT_APP_API_URL}/deliveries`, { data: deliveryData }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Example POST request for checkout items
      for (const item of checkoutItemsData) {
        await axios.post(`${process.env.REACT_APP_API_URL}/checkout-items`, item, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }

      toast.success("Thank You! Order submitted successfully!");

      // Clear the cart and form data, then navigate to home
      setCartItems([]); // Clear cart items
      setContactInfo({ email: '', subscribe: false });
      setDeliveryInfo({
        country: '',
        firstName: '',
        lastName: '',
        address: '',
        apartmentSuite: '',
        city: '',
        postalCode: '',
        phone: '',
        saveInfo: false
      });
      // navigate('/'); // Navigate to home page

    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Response Status:", error.response.status);
        console.error("Error Response Headers:", error.response.headers);
      } else {
        console.error("Error Message:", error.message);
      }
      toast.error("There was an error submitting the form.");
    }
  };

  return (
    <div className="checkout">
      <div className="checkout__container">
        <div className="nav-bar checkout__section">
          <nav>
            <h2 onClick={handleTitleClick} style={{ cursor: "pointer" }}>
              F&G Store
            </h2>
            <div> <span className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span></div>
          </nav>
        </div>

        {showCart && <Cart setShowCart={setShowCart} />}


        <div className="checkout__content">
          <div className="checkout__form">

            <div className="checkout__section contact-section">
              <h3>Contact</h3>
              <input
                type="text"
                name="email"
                placeholder="Email or mobile phone number"
                value={contactInfo.email}
                onChange={handleContactChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <div className="error">{errors.email}</div>}

              <div className="checkout__checkbox">
                <input
                  className="check-label"
                  type="checkbox"
                  name="subscribe"
                  checked={contactInfo.subscribe}
                  onChange={handleContactChange}
                />
                <label htmlFor="subscribe">Email me with news and offers</label>
              </div>
            </div>

            <div className="checkout__section delivery-section">
              <h3>Delivery</h3>

              <select name="country" value={deliveryInfo.country} onChange={handleDeliveryChange}>
                <option value="Pakistan">Pakistan</option>
              </select>

              <div className="form-inputs">

                <form action="" onSubmit={handleSubmit} >



                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={deliveryInfo.firstName}
                    onChange={handleDeliveryChange}
                    className={errors.firstName ? "error" : ""}
                  />
                  {errors.firstName && <div className="error">{errors.firstName}</div>}

                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={deliveryInfo.lastName}
                    onChange={handleDeliveryChange}
                    className={errors.lastName ? "error" : ""}
                  />
                  {errors.lastName && <div className="error">{errors.lastName}</div>}

                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={deliveryInfo.address}
                    onChange={handleDeliveryChange}
                    className={errors.address ? "error" : ""}
                  />
                  {errors.address && <div className="error">{errors.address}</div>}

                  <input
                    type="text"
                    name="apartmentSuite"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={deliveryInfo.apartmentSuite}
                    onChange={handleDeliveryChange}
                  />

                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={deliveryInfo.city}
                    onChange={handleDeliveryChange}
                    className={errors.city ? "error" : ""}
                  />
                  {errors.city && <div className="error">{errors.city}</div>}

                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal code (optional)"
                    value={deliveryInfo.postalCode}
                    onChange={handleDeliveryChange}
                  />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={deliveryInfo.phone}
                    onChange={handleDeliveryChange}
                    className={errors.phone ? "error" : ""}
                  />
                  {errors.phone && <div className="error">{errors.phone}</div>}

                </form>

              </div>

              <div className="checkout__checkbox">
                <input
                  className="check-label"
                  type="checkbox"
                  name="saveInfo"
                  checked={deliveryInfo.saveInfo}
                  onChange={handleDeliveryChange}
                />
                <label htmlFor="saveInfo">Save this information for next time</label>
              </div>

            </div>

            <div className="checkout-section pay-section">
              <h2>Payment</h2>
              <p>All transactions are secure and encrypted.</p>
              <div className="payment-card">
                <div className="payment-card-option">
                  <input
                    type="radio"
                    id="cod"
                    name="payment-method"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={handlePaymentMethodChange}
                  />
                  <label htmlFor="bank-deposit">Bank Deposit</label>
                </div>
                <div className="payment-card-option">
                  <input
                    type="radio"
                    id="bank-deposit"
                    name="payment-method"
                    value="bank-deposit"
                    checked={paymentMethod === "bank-deposit"}
                    onChange={handlePaymentMethodChange}
                  />
                  <label htmlFor="cod">Cash on Delivery (COD)</label>
                </div>
                {paymentMethod === "cod" && (
                  <div className="payment-card-details">
                    <p>Thank you for your order!</p>
                    <p>Your order will be placed after we recive your payment.</p>
                    <p> <strong> Bank:- Meezan </strong></p>
                    <p>Account no: 02560102262419</p>
                    <p>Account Title: AMER AHSAN</p>
                    <p>Iban: PK82MEZN0002560102262419</p>
                  </div>
                )}
                {paymentMethod === "bank-deposit" && (
                  <div className="payment-card-details">
                    <p>Thank you for your order!</p>
                    <p>
                      To confirm your order, you have to make an advance payment of 250
                      rupees separately for delivery charges. After payment, kindly share
                      the screenshot as proof on this number: 03224883941 (WhatsApp only).
                    </p>
                    <h4>Account details :-</h4>
                    <p>Name: Muhammad Ahmed</p>
                    <p>Number: 03224883941</p>
                    <p>Account: Jazzcash/Easypaisa/Sadapay</p>
                    <p>Bank: Meezan</p>
                    <p>Account no: 02560102262419</p>
                    <p>Title: AMER AHSAN</p>
                    <p>Iban: PK82MEZN0002560102262419</p>
                    <p>
                      آپ کے آرڈر کے لیے آپ کا شکریہاپنے آرڈر کی تصدیق کرنے کے لیے، آپ کو ڈیلیوری چارجز کے لیے الگ سے 250 روپے کی آڈوانس ادائیگی کرنی ہوگی۔ ادائیگی کے بعد اس نمبر 03224883941 پر ثبوت کے طور پر اسکرین شاٹ شیئر کریں
                    </p>
                    <p>(صرف واٹس ایپ)</p>
                    <p>اکاؤنٹ کی تفصیلات</p>
                    <p>نام :محمد احمد</p>
                    <p>03224883941 :نمبر</p>
                    <p>اکاؤنٹ : Jazzcash/Easypaisa/Sadapay</p>
                    <p>بینک : میزان</p>
                    <p>:02560102262419:اکاؤنٹ نمبر</p>
                    <p>نام : عامر احسان</p>
                    <p>Iban: PK82MEZN0002560102262419</p>
                  </div>
                )}
              </div>
            </div>

            <button className="checkout__submit" onClick={handleSubmit} type="submit">
              Submit
            </button>

          </div>

          <div className="checkout__summary">
            <h3>Order Summary</h3>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  {/* <div className="summary-item-img">
                    <div className=".quantity-val-img ">
                    {item.attributes.img.data[0]?.attributes.url ?
                      (<img src={process.env.REACT_APP_DEV_URL + item.attributes.img.data[0].attributes.url} alt={item.attributes.title} />) : (<div className="no-image">No Image</div>)}
                  <span>{item.attributes.quantity}</span>
                      </div>
                    <p>{item.attributes.title}</p>
                  </div> */}



                  <div className="summary-item-img">
                    <div className="quantity-val-img">
                      {item.attributes.img.data[0]?.attributes.url ? (
                        <img src={process.env.REACT_APP_DEV_URL + item.attributes.img.data[0].attributes.url} alt={item.attributes.title} />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                      <span >{item.attributes.quantity}</span>
                    </div>
                    <p>{item.attributes.title}</p>
                  </div>




                  <div className="summary-item-details">
                    <p className="fake-price">Rs: {item.attributes.fakePrice}</p>
                    <p className="price">Rs: {item.attributes.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
            <div className="summary-total">
              <p className="total-details">
                <span>Subtotal:</span>
                <span>Rs {cartSubTotal}</span>
              </p>
              <p className="total-details">
                <span>Shipping:</span>
                <span>Free</span>
              </p>
              <p className="finl-total">
                <span>Total:</span>
                <span>PKR {cartSubTotal}</span>
              </p>
              {/* <p>Subtotal: PKR {cartSubTotal}</p>
              <p>Shipping: PKR 0.00</p>
              <p>Total: PKR {cartSubTotal}</p> */}
            </div>

          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Checkout;



















































