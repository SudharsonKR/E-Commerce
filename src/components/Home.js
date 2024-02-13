import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./Home.css";
// import { useGetAllProductsQuery } from "../slices/productsApi";
import { addToCart } from "../slices/cartSlice";

const Home = () => {
  // Using a query hook automatically fetches data and returns query values

  const { items: data, status } = useSelector((state) => state.products);

  //handle cart
  const diapatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    diapatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home_container">
      {status === "success" ? (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <Link to ={`/product/${product._id}`}>
                  <img src={product.image.url} alt={product.name} />
                  </Link>
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">₹ {product.price}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleAddToCart(product);
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;
