import {
  REGISTER,
  LOGIN,
  LOGOUT,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../constants";
import * as api from "../api/user";

/******* User auth *******/
// register a user
export const register = (body, setSnackStatus) => async (dispatch) => {
  try {
    const { data } = await api.register(body);
    if (!data.error) {
      dispatch({ type: REGISTER, payload: data });
    }
  } catch (e) {
    const message = e.response.data.error;
    setSnackStatus({
      status: true,
      severity: "error",
      message,
    });
  }
};

// login a user
export const login = (body, setSnackStatus) => async (dispatch) => {
  try {
    const { data } = await api.login(body);
    if (!data.error) {
      dispatch({ type: LOGIN, payload: data });
    }
  } catch (e) {
    const message = e.response.data.error;
    setSnackStatus({
      status: true,
      severity: "error",
      message,
    });
  }
};

// logout a user
export const logout = () => async (dispatch) => {
  try {
    const { data } = await api.logout();
    if (!data.error) {
      dispatch({ type: LOGOUT });
    }
  } catch (e) {
    const message = e.response.data.error;
    console.log(message);
  }
};

/******* User data *******/
// get user data
export const getUser = (setLoading) => async (dispatch) => {
  try {
    const { data } = await api.getUser();
    if (!data.error) {
      dispatch({ type: GET_USER, payload: data });
    }
  } catch (e) {
  } finally {
    setLoading(false);
  }
};

// update a user
export const updateUser = (body, navigate) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(body);
    if (!data.error) {
      dispatch({ type: UPDATE_USER, payload: data });
      navigate("/");
    }
  } catch (e) {}
};

// delete a user
export const deleteUser = () => async (dispatch) => {
  try {
    const { data } = await api.deleteUser();
    if (!data.error) {
      dispatch({ type: DELETE_USER });
    }
  } catch (e) {}
};
