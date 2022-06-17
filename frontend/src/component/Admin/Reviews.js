import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrorAction,
  getAllReviewsAction,
  deleteReviewsAction,
} from "../../Actions/productAction";
import { DataGrid } from "@mui/x-data-grid";
import "./Reviews.css";
import { Button, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DELETE_REVIEW_RESET } from "../../Constants/productContants";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const Reviews = () => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");

  const { error, reviews, isLoading } = useSelector(
    (state) => state.productReviews
  );
  const { error: dltErr, isDeleted } = useSelector(
    (state) => state.deleteReviews
  );

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllReviewsAction(productId));
  };

  const handleOnDelete = (reviewId) => {
    dispatch(deleteReviewsAction(reviewId, productId));
    dispatch({ type: DELETE_REVIEW_RESET });
  };

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    {
      field: "user",
      headerName: "User",
      type: "text",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 200,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() => handleOnDelete(params.getValue(params.id, "id"))}
            >
              <DeleteForeverIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviewsAction(productId));
    }
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
    if (dltErr) {
      toast.error(dltErr, {
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
    if (isDeleted) {
      toast.success("Review has been deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, toast, isDeleted, dltErr, productId]);

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <ToastContainer />
          <form
            className="productReviewsForm"
            encType="multipart/form-data"
            onSubmit={handleOnSubmit}
          >
            <h1 className="productReviewsFormHeading">
              Enter product ID to find review
            </h1>

            <div>
              <StarBorderIcon />
              <input
                type="text"
                placeholder="Enter product ID to get review"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disbaled={
                isLoading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <Typography
              style={{ textAlign: "center", font: "500 2vmax Roboto" }}
            >
              No reviews found
            </Typography>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Reviews;
