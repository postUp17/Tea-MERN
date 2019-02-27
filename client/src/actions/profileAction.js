import axios from "axios";

import * as actionTypes from "./types";

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addSubject = (subjectData, history) => dispatch => {
  axios
    .post("/api/profile/subject", subjectData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: {}
      })
    );
};

export const deleteSubject = id => dispatch => {
  axios
    .delete(`api/profile/subject/${id}`)
    .then(res =>
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: null
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: actionTypes.PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_PROFILE
  };
};
