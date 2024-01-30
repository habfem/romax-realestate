import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    loggedFlag: false,

  },

  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.loggedFlag = true
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload
    },
    resetState: (state) => {
      return {
        currentUser: null,
        isFetching: false,
        error: false,
      };
    },
    resetLoggedInFlag: (state) => {
      state.loggedFlag = false;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, resetState, resetLoggedInFlag } = userSlice.actions;
export default userSlice.reducer;