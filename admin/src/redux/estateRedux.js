import { createSlice } from "@reduxjs/toolkit";

export const estateSlice = createSlice({
  name: "estate",
  initialState: {
    estates: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getEstateStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getEstateSuccess: (state, action) => {
      state.isFetching = false;
      state.estates = action.payload;
    },
    getEstateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteEstateStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteEstateSuccess: (state, action) => {
      state.isFetching = false;
      state.estates.splice(
        state.estates.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteEstateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateEstateStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateEstateSuccess: (state, action) => {
      state.isFetching = false;
      state.estates[
        state.estates.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.estate;
    },
    updateEstateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addEstateStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addEstateSuccess: (state, action) => {
      state.isFetching = false;
      state.estates.push(action.payload);
    },
    addEstateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getEstateStart,
  getEstateSuccess,
  getEstateFailure,
  deleteEstateStart,
  deleteEstateSuccess,
  deleteEstateFailure,
  updateEstateStart,
  updateEstateSuccess,
  updateEstateFailure,
  addEstateStart,
  addEstateSuccess,
  addEstateFailure,
} = estateSlice.actions;

export default estateSlice.reducer;