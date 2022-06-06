import { configureStore } from "@reduxjs/toolkit";

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
