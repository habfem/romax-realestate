import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest, updateTokenInHeaders} from "../requestMethods";
import {
  addTimelineFailure,
  addTimelineStart,
  addTimelineSuccess,
  deleteTimelineFailure,
  deleteTimelineStart,
  deleteTimelineSuccess,
  getTimelineFailure,
  getTimelineStart,
  getTimelineSuccess,
  updateTimelineFailure,
  updateTimelineStart,
  updateTimelineSuccess,
} from "./timelineRedux";
import {
  addUsersFailure,
  addUsersStart,
  addUsersSuccess,
  deleteUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  updateUsersFailure,
  updateUsersStart,
  updateUsersSuccess
} from "./usersRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    updateTokenInHeaders(res.data.accessToken)
  } catch (err) {
    dispatch(loginFailure(err.response.data));
  }
};

export const getTimeline = async (dispatch) => {
  dispatch(getTimelineStart());
  try {
    const res = await publicRequest.get("/timeline");
    dispatch(getTimelineSuccess(res.data));

  } catch (err) {
    dispatch(getTimelineFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await publicRequest.get("/users");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

export const deleteTimeline = async (id, dispatch) => {
  dispatch(deleteTimelineStart());
  try {
    const res = await userRequest.delete(`/timeline/${id}`);
    dispatch(deleteTimelineSuccess(res.data));
  } catch (err) {
    dispatch(deleteTimelineFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUsersStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUsersSuccess(res.data));
  } catch (err) {
    dispatch(deleteUsersFailure());
  }
};

export const updateTimeline = async (id, timeline, dispatch) => {
  dispatch(updateTimelineStart());
  try {
    const res = await userRequest.put(`/timeline/${id}`, timeline);
    dispatch(updateTimelineSuccess(res.data));
  } catch (err) {
    dispatch(updateTimelineFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUsersStart());
  try {
    // update
    dispatch(updateUsersSuccess({ id, user }));
  } catch (err) {
    dispatch(updateUsersFailure());
  }
};

export const readProducts = async () => {
  const response = await publicRequest.get(`/products`);
  return response.data;
};

export const readEstates = async () => {
  const response = await publicRequest.get(`/estate`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await userRequest.post(`/products`, product);
  return response.data;
};

export const createEstate = async (estate) => {
  const response = await userRequest.post(`/estate`, estate);
  return response.data;
};

export const readProduct = async (id) => {
  const response = await publicRequest.get(`/products/${id}`);
  return response.data;
};

export const readEstate = async (id) => {
  const response = await publicRequest.get(`/estate/find/${id}`);
  return response.data;
};

export const removeProduct = async (id) => {
  const response = await userRequest.delete(`/products/${id}`);
  return response.data;
};

export const removeEstate = async (id) => {
  const response = await userRequest.delete(`/estate/${id}`);
  return response.data;
};

export const editProduct = async (id, product) => {
  const response = await userRequest.put(`/products/${id}`, product);
  return response.data;
};

export const editEstate = async (id, estate) => {
  const response = await userRequest.put(`/estate/${id}`, estate);
  return response.data;
};

export const addTimeline = async (timeline, dispatch) => {
  dispatch(addTimelineStart());
  try {
    const res = await userRequest.post(`/timeline`, timeline);
    dispatch(addTimelineSuccess(res.data));
  } catch (err) {
    dispatch(addTimelineFailure());
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(addUsersStart());
  try {
    const res = await userRequest.post(`/auth/register`, user);
    dispatch(addUsersSuccess(res.data));
  } catch (err) {
    dispatch(addUsersFailure());
  }
};
