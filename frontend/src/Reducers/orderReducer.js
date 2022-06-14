import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERRORS,
} from "../Constants/orderConstant";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        isLoading: false,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
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
