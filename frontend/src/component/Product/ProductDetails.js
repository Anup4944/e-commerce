import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDeatils.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorAction,
  getProductDetailsAction,
  newReviewAction,
} from "../../Actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../Layout/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCartAction } from "../../Actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { NEW_REVIEW_RESET } from "../../Constants/productContants";

const ProductDetails = () => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();

  const { product, isLoading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: revErr } = useSelector((state) => state.newReview);

  const increaseQty = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCart = () => {
    dispatch(addToCartAction(id, quantity));

    toast.success("Item added to cart", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const submitReview = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReviewAction(myForm));
    setOpen(false);
  };

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
    if (revErr) {
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

    if (success) {
      alert("New review added");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetailsAction(id));
  }, [dispatch, error, toast, id, revErr, success, alert]);

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
                    <button onClick={decreaseQty}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increaseQty}>+</button>
                  </div>

                  <button
                    onClick={addToCart}
                    disabled={product.stock < 1 ? true : false}
                  >
                    Add to cart
                  </button>
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

              <button onClick={submitReviewToggle} className="submitReview">
                Submit review
              </button>
            </div>
          </div>

          <h3 className="reviewHeading">Reviews</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={submitReviewToggle}>
                Cancel
              </Button>
              <Button color="primary" onClick={submitReview}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>

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
