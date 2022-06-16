// import { configureStore } from "@reduxjs/toolkit";

// const store = configureStore({
//   reducer: {
//     products: productReducer,
//     productDetails: productDetailsReducer,
//     user: userReducer,
//     profile: profileReducer,
//     forgotPass: forgotPassReducer,
//     cart: cartReducer,
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// export default store;

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./Reducers/cartReducer";

import {
  newProductReducer,
  newReviewsReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
} from "./Reducers/productReducer";
import {
  forgotPassReducer,
  profileReducer,
  userReducer,
} from "./Reducers/userReducer";
import {
  allOrdersReducer,
  myOrderReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./Reducers/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPass: forgotPassReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
