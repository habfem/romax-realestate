import { createSlice } from "@reduxjs/toolkit";

export const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    timelines: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getTimelineStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getTimelineSuccess: (state, action) => {
      state.isFetching = false;
      state.timelines = action.payload;
    },
    getTimelineFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteTimelineStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteTimelineSuccess: (state, action) => {
      state.isFetching = false;
      state.timelines.splice(
        state.timelines.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteTimelineFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateTimelineStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateTimelineSuccess: (state, action) => {
      state.isFetching = false;
      state.timelines[
        state.timelines.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.timeline;
    },
    updateTimelineFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addTimelineStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addTimelineSuccess: (state, action) => {
      state.isFetching = false;
      state.timelines.push(action.payload);
    },
    addTimelineFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getTimelineStart,
  getTimelineSuccess,
  getTimelineFailure,
  deleteTimelineStart,
  deleteTimelineSuccess,
  deleteTimelineFailure,
  updateTimelineStart,
  updateTimelineSuccess,
  updateTimelineFailure,
  addTimelineStart,
  addTimelineSuccess,
  addTimelineFailure,
} = timelineSlice.actions;

export default timelineSlice.reducer;