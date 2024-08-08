import React, { useState, useEffect } from 'react';
import './Catalog.scss';
import { fetchDataFromApi } from '../../utils/api';
import Product from '../Products/Product/Product';
import { useNavigate } from 'react-router-dom';

const Catalog = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('alphabetical'); // Default sort by alphabetical
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await fetchDataFromApi('/api/categories?populate=*');
      setCategories(categoriesData.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const productsData = await fetchDataFromApi('/api/products?populate=*');
      setProducts(productsData.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Assuming you have a product detail page
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleShowAllClick = () => {
    setSelectedCategory(null);
  };

  // Sorting functions
  const sortAlphabetically = (products) =>
    [...products].sort((a, b) => {
      const nameA = a.attributes.name?.toLowerCase() || '';
      const nameB = b.attributes.name?.toLowerCase() || '';
      return nameA.localeCompare(nameB);
    });

  const sortByPriceLowToHigh = (products) =>
    [...products].sort((a, b) => {
      const priceA = a.attributes.salePrice ? parseFloat(a.attributes.salePrice) : 0;
      const priceB = b.attributes.salePrice ? parseFloat(b.attributes.salePrice) : 0;
      return priceA - priceB;
    });

  const sortByPriceHighToLow = (products) =>
    [...products].sort((a, b) => {
      const priceA = a.attributes.salePrice ? parseFloat(a.attributes.salePrice) : 0;
      const priceB = b.attributes.salePrice ? parseFloat(b.attributes.salePrice) : 0;
      return priceB - priceA;
    });

  const sortByLatest = (products) =>
    [...products].sort((a, b) => {
      const dateA = new Date(a.attributes.createdAt);
      const dateB = new Date(b.attributes.createdAt);
      return dateB - dateA;
    });

  // Filter and sort products
  const filteredAndSortedProducts = () => {
    let filteredProducts = [...products]; // Clone the products array

    // Filter by category if selected
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) =>
        product.attributes.categories.data.some((category) => category.id === selectedCategory)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'alphabetical':
        return sortAlphabetically(filteredProducts);
      case 'price-low-to-high':
        return sortByPriceLowToHigh(filteredProducts);
      case 'price-high-to-low':
        return sortByPriceHighToLow(filteredProducts);
      case 'latest':
        return sortByLatest(filteredProducts);
      default:
        return filteredProducts;
    }
  };

  // Total number of products available
  const totalProducts = () => {
    return products.length;
  };

  // Number of products currently being displayed
  const displayedProducts = () => {
    return filteredAndSortedProducts().length;
  };

  return (
    <div className="catalog-container">

      <div className="filter-sort-container">
        <div className="categories-container">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <img
                src={
                  process.env.REACT_APP_DEV_URL +
                  category.attributes.img.data[0].attributes.url
                }
                alt={category.attributes.title}
              />
              <span>{category.attributes.title}</span>
            </div>
          ))}
        </div>
      </div>



      <div className="sorting">
        <div className="sort">

          <p className="product-count">
            Total {totalProducts()} products
          </p>

          <div>
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" onChange={handleSortChange} value={sortBy}>
              <option value="alphabetical">Alphabetical</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
              <option value="latest">Latest Products</option>
            </select>
          </div>

        </div>

        {selectedCategory && (
          <div className="category-item show-all" onClick={handleShowAllClick}>
            <span>Show All</span>
          </div>
        )}
      </div>


      <div className="products-container">
        <h1 className="product-title">Products</h1>

        <div className="products-grid">
          {filteredAndSortedProducts().map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <Product data={product.attributes} />
            </div>
          ))}
        </div>





      </div>

      <p className="product-count">
        Showing {displayedProducts()} of {totalProducts()} products
      </p>
    </div>
  );
};

export default Catalog;
