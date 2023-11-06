import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  createEstate,
  readEstate,
  readEstates,
  removeEstate,
  editEstate,
} from "./apiCalls"

export const getEstates = createAsyncThunk(
  "estate/get-estates",
  async (thunkAPI) => {
    try {
      return await readEstates();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getEstate = createAsyncThunk(
  "estate/get-estate",
  async (id, thunkAPI) => {
    try {
      return await readEstate(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createEstates = createAsyncThunk(
  "estate/create-estates",
  async (estateData, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("title", estateData.title);
      formData.append("desc", estateData.desc);
      formData.append("location", estateData.location);
      formData.append("house", estateData.house);
      estateData.features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });
      estateData.categories.forEach((category, index) => {
        formData.append(`categories[${index}]`, category);
      });
      estateData.images.forEach((image) => {
        formData.append(`images`, image);
      });

      return await createEstate(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateEstate = createAsyncThunk(
  "estate/update-estate",
  async (data, thunkAPI) => {
    const { id, estateData } = data;
    try {
      const formData = new FormData();
      formData.append("title", estateData.title);
      formData.append("desc", estateData.desc);
      formData.append("location", estateData.location);
      formData.append("house", estateData.house);
      estateData.features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });
      estateData.categories.forEach((category, index) => {
        formData.append(`categories[${index}]`, category);
      });
      estateData.images.forEach((image) => {
        formData.append(`images`, image);
      });
      estateData.previousImages.forEach((image, index) => {
        formData.append(`previousImages[${index}]`, JSON.stringify(image));
      });

      return await editEstate(id, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteEstate = createAsyncThunk(
  "estate/delete-estate",
  async (id, thunkAPI) => {
    try {
      return await removeEstate(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  estates: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const resetState = createAction("Reset_all_EstateState");

export const estateSlice = createSlice({
  name: "estates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEstates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEstates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.estates = action.payload;
      })
      .addCase(getEstates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getEstate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEstate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.estateData = action.payload;
      })
      .addCase(getEstate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createEstates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEstates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdEstate = action.payload;
      })
      .addCase(createEstates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateEstate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEstate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEstate = action.payload;
      })
      .addCase(updateEstate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteEstate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEstate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedEstdeleteEstate = action.payload;
      })
      .addCase(deleteEstate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default estateSlice.reducer;