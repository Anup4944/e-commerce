import React, { Fragment, useEffect } from "react";
import "./Home.css";
import { FaMouse } from "react-icons/fa";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorAction,
  getProductAction,
} from "../../Actions/productAction";
import Loader from "../Layout/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { clearMsgAction } from "../../Actions/userAction";

const Home = () => {
  const dispatch = useDispatch();

  const { product, isLoading, error } = useSelector((state) => state.products);
  // const { message } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearErrorAction());
    }

    // if (message) {
    //   toast.success(message, {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   dispatch(clearMsgAction());
    // }
    dispatch(getProductAction());
    return () => {};
  }, [dispatch, error]);
  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

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
            {product && product.map((prod) => <ProductCard product={prod} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
