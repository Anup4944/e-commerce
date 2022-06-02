import axios from "axios";

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../Constants/productContants";

export const getProductAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/product");

    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ALL_PRODUCT_FAIL, payload: error.response.data.message });
  }
};

export const clearErrorAction = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
