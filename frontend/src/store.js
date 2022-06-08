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
  productDetailsReducer,
  productReducer,
} from "./Reducers/productReducer";
import {
  forgotPassReducer,
  profileReducer,
  userReducer,
} from "./Reducers/userReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPass: forgotPassReducer,
  cart: cartReducer,
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
