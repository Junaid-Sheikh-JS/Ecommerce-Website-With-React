// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import SingleProduct from "./components/SingleProduct/SingleProduct";
// import { CartProvider } from "./utils/context"; // Ensure you are importing CartProvider
// import Header from "./components/Header/Header";
// import Home from "./components/Home/Home";
// import Category from "./components/Category/Category";
// import Footer from "./components/Footer/Footer";
// import Payment from "./components/Payment/Payment";
// import Contact from "./components/Contact/Contact";
// import Catalog from "./components/Catalog/Catalog";
// import Returns from "./components/Footer/Returns/Returns";
// import TermsConditions from "./components/Footer/Terms_Conditions/TermsConditions";
// import PrivacyPolicy from "./components/Footer/Privacy_Policy/PrivacyPolicy";
// import Services from "./components/Home/Services/Services";
// import Newsletter from "./components/Footer/Newsletter/Newsletter"


// function App() {
//     const location = useLocation();
//     const specialPages = ["/contact", "/privacy-policy", "/returns", "/terms-conditions", "/checkout"];
//     const isSpecialPage = specialPages.includes(location.pathname);

//     return (
//         <CartProvider>
//             <Header />
//             <Routes>
//                 <Route path="/" element={<Home />} />



//                 <Route path="/product/:id" element={<SingleProduct />} />
//                 <Route path="/category/:id" element={<Category />} />
//                 <Route path="/contact" element={<Contact />} />
//                 <Route path="/catalog" element={<Catalog />} />
//                 <Route path="/checkout" element={<Payment />} />
//                 <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//                 <Route path="/returns" element={<Returns />} />
//                 <Route path="/terms-conditions" element={<TermsConditions />} />
//                 <Route path="/services" element={<Services />} />
//             </Routes>
//             {!isSpecialPage && <Newsletter />} {/* Conditionally render the Newsletter component */}
//             <Footer />
//         </CartProvider>
//     );
// }

// export default App;











































import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import { CartProvider } from "./utils/context"; // Ensure you are importing CartProvider
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import Footer from "./components/Footer/Footer";
import Payment from "./components/Payment/Payment";
import Contact from "./components/Contact/Contact";
import Catalog from "./components/Catalog/Catalog";
import Returns from "./components/Footer/Returns/Returns";
import TermsConditions from "./components/Footer/Terms_Conditions/TermsConditions";
import PrivacyPolicy from "./components/Footer/Privacy_Policy/PrivacyPolicy";
import Services from "./components/Home/Services/Services";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import OnTop from "./components/OnTop/OnTop"; // Import OnTop component

function App() {
    const location = useLocation();
    const specialPages = ["/contact", "/privacy-policy", "/returns", "/terms-conditions", "/checkout"];
    const isSpecialPage = specialPages.includes(location.pathname);
    const isHomePage = location.pathname === "/";


    return (
        <CartProvider>
           {isHomePage && <OnTop />} {/* Add OnTop component */}
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="/category/:id" element={<Category />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/checkout" element={<Payment />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/services" element={<Services />} />
            </Routes>
            {!isSpecialPage && <Newsletter />} {/* Conditionally render the Newsletter component */}
            <Footer />
        </CartProvider>
    );
}

export default App;

















