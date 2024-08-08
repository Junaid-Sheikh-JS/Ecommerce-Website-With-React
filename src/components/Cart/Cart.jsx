import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import "./Cart.scss";
import { useCart } from "../../utils/context";
import { useNavigate, useLocation } from "react-router-dom";

const Cart = ({ setShowCart }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const { cartItems, cartSubTotal } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Reset animation state when cart is opened
        if (!isAnimating) {
            setIsAnimating(false);
        }
    }, [location.pathname]);

    const handleCheckout = () => {
        // Close the cart before navigating
        setShowCart(false);
        setIsAnimating(true);
        setTimeout(() => {
            navigate("/checkout");
        }, 500); // Match this delay with your animation duration
    };

    return (
        <div className={`cart-panel ${isAnimating ? 'animate-checkout' : ''}`}>
            <div className="opac-layer"></div>
            <div className="cart-content">
                <div className="cart-header">
                    <div className="heading">Shopping Cart</div>
                    <span className="close-btn" onClick={() => setShowCart(false)}>
                        <MdClose />
                        <span className="text">Close</span>
                    </span>
                </div>

                {!cartItems?.length && (
                    <div className="empty-cart">
                        <BsCartX />
                        <span>No Product in the Cart.</span>
                        <button className="return-cta" onClick={() => navigate("/")}>RETURN TO SHOP</button>
                    </div>
                )}

                {!!cartItems?.length && (
                    <>
                        <CartItem />
                        <div className="cart-footer">
                            <div className="subtotal">
                                <span className="text">Subtotal :</span>
                                <span className="text total">PKR {cartSubTotal}</span>
                            </div>
                            <div className="button">
                                <div className="checkout-cta" onClick={handleCheckout}>
                                    Checkout
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;