import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { getProductAction } from "../../Actions/productAction";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const { keyword } = useParams();

  const {
    isLoading,
    product,
    error,
    productsCount,
    resultPerPage,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProductAction(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);
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

          {resultPerPage < productsCount && (
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
