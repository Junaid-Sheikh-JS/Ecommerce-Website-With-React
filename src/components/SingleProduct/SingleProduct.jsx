import { useState, useEffect } from "react";
import { useCart } from "../../utils/context";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaCartPlus,
    FaWhatsapp,
} from "react-icons/fa";
import "./SingleProduct.scss";

const SingleProduct = () => {
    const { handleAddToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const { data, error, loading } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);

    useEffect(() => {
        if (data && data.data && data.data.length > 0) {
            setProduct(data.data[0]?.attributes);
            setSelectedImage(null); // Reset the selected image when product changes
        }
    }, [data]);

    const decrement = () => {
        setQuantity((prevState) => (prevState === 1 ? 1 : prevState - 1));
    };

    const increment = () => {
        setQuantity((prevState) => prevState + 1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading product</div>;
    if (!product) return <div>No product found</div>;

    const images = product.img.data;
    const hasMultipleImages = images.length > 1;
    const mainImageUrl = selectedImage || process.env.REACT_APP_DEV_URL + images[0]?.attributes?.url;

    return (
        <div className="single-product-main-content">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left">
                        <div className="main-image">
                            <img
                                src={mainImageUrl}
                                alt={product.title}
                            />
                        </div>
                        {hasMultipleImages && (
                            <div className="thumbnail-images">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={process.env.REACT_APP_DEV_URL + image.attributes?.url}
                                        alt={product.title}
                                        onClick={() => setSelectedImage(process.env.REACT_APP_DEV_URL + image.attributes?.url)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="right">
                        <span className="name">{product.title}</span>
                        <p>
                            <span className="price fake-price">PKR{product.fakePrice}</span>
                            <span className="price">PKR {product.price}</span>

                        </p>
                        <span className="desc">{product.desc}</span>

                        <div className="cart-buttons">
                            <div className="quantity-buttons">
                                <span onClick={decrement}>-</span>
                                <span>{quantity}</span>
                                <span onClick={increment}>+</span>
                            </div>
                            <button
                                className="add-to-cart-button"
                                onClick={() => {
                                    handleAddToCart(data.data[0], quantity);
                                    setQuantity(1);
                                }}
                            >
                                <FaCartPlus size={20} />
                                ADD TO CART
                            </button>
                        </div>

                        <span className="divider" />
                        <div className="info-item">
                            <span className="text-bold">
                                Category:{" "}
                                <span>
                                    {
                                        product.categories.data[0]?.attributes?.title
                                    }
                                </span>
                            </span>
                            <p className="text-bold">
                                <span className="social-icons">
                                    <div className="icon"><FaFacebookF size={14} /></div>
                                    <div className="icon"><FaInstagram size={14} /></div>
                                    <div className="icon"><FaTwitter size={14} /></div>
                                    <div className="icon"><FaWhatsapp size={14} /></div>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="related">

                    {/* Always render RelatedProducts */}
                    <RelatedProducts

                        productId={id}
                        categoryId={product.categories.data[0]?.id}
                    />
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
















































