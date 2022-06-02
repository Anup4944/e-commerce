import React, { Fragment, useEffect } from "react";
import "./Home.css";
import { FaMouse } from "react-icons/fa";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../../Actions/productAction";
import Loader from "../Layout/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const { product, isLoading, error, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProductAction());
  }, [dispatch]);
  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
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
            {product && product.map((prod) => <Product product={prod} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
