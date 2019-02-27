import * as actionTypes from "../actions/types";

const initialState = {
  profileLoding: false,
  profile: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PROFILE_LOADING:
      return {
        ...state,
        profileLoding: true
      };

    case actionTypes.GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        profileLoding: false
      };

    case actionTypes.CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}
