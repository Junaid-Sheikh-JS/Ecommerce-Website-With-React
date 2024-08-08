// import { useContext } from 'react';
import { useEffect } from 'react';
import { useCart } from '../../utils/context';

import "./Home.scss"

import Services from "./Services/Services"

import Banner from "./Banner/Banner"
import Banner2 from "./Banner/Banner2";
// import Banner3 from "./Banner/Banner3";
// import Banner4 from "./Banner/Banner4";
import Category from './Category/Category';
import Products from '../Products/Products';
import { fetchDataFromApi } from '../../utils/api';
import CarouselComponent from './Banner/Carousel';

const Home = () => {
    const { products, setProducts, categories, setCategories } = useCart();

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);


    const getProducts = () => {
        fetchDataFromApi("/api/products?populate=*").then(res => {
            console.log(res)
            setProducts(res)
        });
    };
    const getCategories = () => {
        fetchDataFromApi("/api/categories?populate=*").then(res => {
            console.log(res)
            setCategories(res)
        });
    };

    const banners = [
        <Banner />,
        <Banner2 />,
        // <Banner3 />,
    ];

    return (
        <>
            <CarouselComponent banners={banners} />
            <div className="main-content">
                <div className="layout">
                    <Category categories={categories} />
                    <Products products={products} headingText="Popular Products" />
                </div>
                <Services />
            </div>
        </>
    );
};

export default Home;

