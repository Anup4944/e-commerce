import { configureStore } from "@reduxjs/toolkit";
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

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPass: forgotPassReducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
