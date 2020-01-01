import { AuthActionTypes } from "./auth.actiontype";
import axios from "axios";
import setAuthToken from "../../utils/Auth.Token";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: AuthActionTypes.USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AuthActionTypes.AUTH_ERROR
    });
  }
};

export const setAuth = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/user", body, config);
    dispatch({
      type: AuthActionTypes.REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.error;
    window.alert(errors)
  

    dispatch({
      type: AuthActionTypes.REGISTER_FAIL
    });
  }
};
export const loginUser = (email, password) => async dispatch => {

  const config = {
    headers: {
      "Content-Type": "application/json"
    } 
  };
  const body = JSON.stringify({ email, password });


  try {
    const res = await axios.post("/api/auth",body, config);
    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response.data.error);
    //const errors = err.response.data.error;
    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    // }

    dispatch({
      type: AuthActionTypes.LOGIN_FAIL
    });
  }
};

export const userLogout = () => dispatch => {
  dispatch({
    type: AuthActionTypes.LOGOUT_SUCCESS
  });
};
