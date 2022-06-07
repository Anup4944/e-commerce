import React, { Fragment } from "react";
import "./Cart.css";
import CartItem from "./CartItem.js";

const Cart = () => {
  const item = {
    product: "productId",
    price: "24000",
    name: "Test Product",
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  };
  return (
    <Fragment>
      <div className="cartPage">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>

        <div className="cartContainer">
          <CartItem item={item} />
          <div>
            <button>-</button>
            <input type="number" value={item.quantity} readOnly />
            <button>+</button>
          </div>
          <p className="cartSubTotal">{`$${item.price * item.quantity}`}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
