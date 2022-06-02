import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../Constants/productContants";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        isLoading: true,
        product: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        isLoading: false,
        product: action.payload.products,
        productsCount: action.payload.productsCount,
      };
    case ALL_PRODUCT_FAIL:
      return {
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
