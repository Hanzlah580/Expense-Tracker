import { ProfileActionTypes } from "../Data/data.type";

const INITIAL_STATE = {
  profile: [],
  loading: true,
  error: {}
};

const profileReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ProfileActionTypes.GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case ProfileActionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
   

    default:
      return state;
  }
};

export default profileReducer;
