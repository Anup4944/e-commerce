import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADUSER_REQUEST,
  LOADUSER_SUCCESS,
  LOADUSER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_MESSAGE,
} from "../Constants/userConstant";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOADUSER_REQUEST:
      return {
        isLoading: true,
        isAuth: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOADUSER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        isLoading: false,
        isAuth: false,
        user: null,
        message: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        user: null,
        error: action.payload,
      };
    case LOADUSER_FAIL:
      return {
        isLoading: false,
        isAuth: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};
