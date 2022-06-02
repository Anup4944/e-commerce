import { applyMiddleware, combineReducers, createStore } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from "./Reducers/productReducer";

const reducer = combineReducers({
  products: productReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
