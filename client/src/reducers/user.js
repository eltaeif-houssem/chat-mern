import {
  REGISTER,
  LOGIN,
  LOGOUT,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../constants";

const initialState = { user: null, isLoggedIn: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
    case GET_USER:
    case UPDATE_USER:
      return { user: action.payload, isLoggedIn: true };

    case LOGOUT:
    case DELETE_USER:
      return { user: null, isLoggedIn: false };

    default:
      return state;
  }
};

export default reducer;
