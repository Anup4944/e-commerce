import React, { Fragment, useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { getProductAction } from "../../Actions/productAction";
import ProductCard from "../Home/ProductCard";

const Products = () => {
  const dispatch = useDispatch();

  const { isLoading, product, error, productCount } = useSelector(
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
          <h2 className="prodHeading">Products</h2>
          <div className="productContainer">
            {product &&
              product.map((prod) => (
                <ProductCard key={prod._id} product={prod} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
