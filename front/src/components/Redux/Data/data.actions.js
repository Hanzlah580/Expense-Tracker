import axios from "axios";
import { ProfileActionTypes } from "../Data/data.type";

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/data");

    dispatch({
      type: ProfileActionTypes.GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ProfileActionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


export const createProfile = (
  state
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(
      "/api/data",
      state,
      config
    );
    dispatch({
      type: ProfileActionTypes.GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) {
        console.log(errors)
      errors.forEach(error => console.log(error));
    }
    dispatch({
      type: ProfileActionTypes.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


