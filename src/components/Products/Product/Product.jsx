import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ id, data }) => {
    const navigate = useNavigate();

    // Handle case where image might be missing
    const imageUrl = data?.img?.data?.[0]?.attributes?.url
        ? process.env.REACT_APP_DEV_URL + data.img.data[0].attributes.url
        : '/path/to/default/image.jpg'; // default image path

    return (
        <div className="product-card" onClick={() => navigate("/product/" + id)}>
            <div className="thumbnail">
                <img src={imageUrl} alt={data?.title || "Product Image"} />
            </div>
            <div className="prod-details">
                <span className="name">{data?.title}</span>
                <span className=" fake-price">PKR {data?.fakePrice}</span>
                <span className="price">PKR {data?.price}</span>
            </div>
        </div>
    );
};

export default Product;
