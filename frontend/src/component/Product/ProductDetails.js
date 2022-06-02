import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDeatils.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorAction,
  getProductDetailsAction,
} from "../../Actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../Layout/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { product, isLoading, error } = useSelector(
    (state) => state.productDetails
  );

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
    dispatch(getProductDetailsAction(id));
  }, [dispatch, error, toast, id]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
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
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      src={item.url}
                      className="CarouselImage"
                      key={i}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="prodDetails-1">
                <h2>{product.name}</h2>
                <p>Product Id: {product._id}</p>
              </div>

              <div className="prodDetails-2">
                <ReactStars {...options} />
                <span>({product.numReviews})</span>
              </div>

              <div className="prodDetails-3">
                <h1>${product.price}</h1>

                <div className="prodDetails-3-1">
                  <div className="prodDetails-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>

                  <button>Add to cart</button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out of stock" : "In stock"}
                  </b>
                </p>
              </div>

              <div className="prodDetails-4">
                Description: <p>{product.desc}</p>
              </div>

              <button className="submitReview">Submit review</button>
            </div>
          </div>

          <h3 className="reviewHeading">Reviews</h3>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No reviews yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;