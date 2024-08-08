import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import { useCart } from "../../utils/context";
import "./Header.scss";
import Logo from "../Header/Logo/Logo"

const Header = () => {
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  // const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          {/* Hamburger Menu for Small Screens */}
          <div className="hamburger-menu" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <AiOutlineClose /> : <AiOutlineMenu />} {/* Toggle icon */}
          </div>
          {/* Left Navigation (Visible on Large Screens) */}
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/catalog")}>Catalog</li>
            <li onClick={() => navigate("/contact")}>Contact</li>
          </ul>
          {/* Center Logo */}
          <div className="center" onClick={() => navigate("/")}><Logo /></div>
          {/* Right Navigation (Visible on Large Screens) */}
          <div className="right">
            <span className="cart-icon" onClick={() => setShowCart(true)}>
              <CgShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
          </div>
        </div>
      </header>
      {/* Cart Component */}
      {showCart && <Cart setShowCart={setShowCart} />}
      {/* Mobile Menu (Slide-in from Left) */}
      {showMenu && (
        <div className="mobile-menu">
          <ul>
            <li onClick={() => { navigate("/"); setShowMenu(false); }}>Home</li>
            <li onClick={() => { navigate("/catalog"); setShowMenu(false); }}>Catalog</li>
            <li onClick={() => { navigate("/contact"); setShowMenu(false); }}>Contact</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;