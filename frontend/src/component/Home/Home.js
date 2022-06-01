import React, { Fragment } from "react";
import "./Home.css";
import { FaMouse } from "react-icons/fa";
import Product from "./Product";

const product = {
  name: "PS5 Console",
  price: "750",
  _id: "anup",
  images: [
    {
      url: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
    },
  ],
};

const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to my e-commerce store</p>
        <h1>Find amazing proucts below</h1>
        <a href="#container">
          <button>
            Scroll <FaMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
