import { configureStore } from "@reduxjs/toolkit";

import {
  productDetailsReducer,
  productReducer,
} from "./Reducers/productReducer";
import { profileReducer, userReducer } from "./Reducers/userReducer";

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
