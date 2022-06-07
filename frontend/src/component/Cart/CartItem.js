import React from "react";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  return (
    <div className="cartItemCon">
      <img src={item.image} alt="pic" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>

        <span>{`Price : $${item.price}`}</span>
        <p>Remove</p>
      </div>
    </div>
  );
};

export default CartItem;
