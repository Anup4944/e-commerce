import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { getProductAction } from "../../Actions/productAction";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Typography } from "@mui/material";
import { Slider } from "@mui/material";

const categories = ["Electronics", "Footwear", "Clothing", "Shoes", "Gaming"];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const [price, setPrice] = useState([0, 25000]);
  const dispatch = useDispatch();

  const { keyword } = useParams();

  const handleOnPriceChange = (e, newPrice) => {
    setPrice(newPrice);
  };

  const {
    isLoading,
    product,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProductAction(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  let count = filteredProductsCount;
  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="prodHeading">Products</h2>
          <div className="productContainer">
            {product &&
              product.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>
              <Slider
                value={price}
                onChange={handleOnPriceChange}
                valueLabelDisplay="on"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />
            </Typography>

            <Typography
              style={{
                borderBottom: "1px solid black",
                textAlign: "center",
                margin: "auto",
              }}
            >
              Catgeories
            </Typography>

            <ul className="categoryBox">
              {categories.map((cat) => (
                <li
                  className="catgeoryLi"
                  key={cat}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>

              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="range-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
