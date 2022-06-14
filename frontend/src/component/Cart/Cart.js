import React, { Fragment } from "react";
import "./Cart.css";
import CartItem from "./CartItem.js";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAction, removeCartAction } from "../../Actions/cartAction";
import { Typography } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (stock <= quantity) return;

    dispatch(addToCartAction(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;

    if (1 >= quantity) return;

    dispatch(addToCartAction(id, newQty));
  };

  const deleteCart = (id) => {
    dispatch(removeCartAction(id));
  };

  const handleOnCheckOut = () => {
    navigate("/shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="noItem">
          <RemoveShoppingCartIcon />
          <Typography> No items on cart</Typography>
          <Link to="/products">View products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Total</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItem item={item} removeCartItm={deleteCart} />
                  <div>
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubTotal">{`$${item.price *
                    item.quantity}`}</p>
                </div>
              ))}

            <div className="cartGrossTot">
              <div></div>

              <div className="cartGrossTotBox">
                <p>Gross Total</p>
                <p>
                  {" "}
                  $
                  {`${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}
                </p>
              </div>

              <div></div>

              <div className="checkOutBtn">
                <button onClick={handleOnCheckOut}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
