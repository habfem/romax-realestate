import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  createProduct,
  readProduct,
  readProducts,
  removeProduct,
  editProduct,
} from "./apiCalls";

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      return await readProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/get-product",
  async (id, thunkAPI) => {
    try {
      return await readProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProducts = createAsyncThunk(
  "product/create-products",
  async (productData, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("desc", productData.desc);
      formData.append("price", productData.price);
      formData.append("location", productData.location);
      formData.append("address", productData.address);
      formData.append("propertyType", productData.propertyType);
      formData.append("size", productData.size);
      formData.append("bed", productData.bed);
      formData.append("bath", productData.bath);
      formData.append("car", productData.car);
      formData.append("isFeatured", productData.isFeatured);
      formData.append("inStock", productData.inStock);

      productData.features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });
      formData.append("category", productData.category);
      productData.images.forEach((image) => {
        formData.append(`images`, image);
      });

      return await createProduct(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update-product",
  async (data, thunkAPI) => {
    const { id, productData } = data;
    try {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("desc", productData.desc);
      formData.append("price", productData.price);
      formData.append("location", productData.location);
      formData.append("address", productData.address);
      formData.append("propertyType", productData.propertyType);
      formData.append("size", productData.size);
      formData.append("bed", productData.bed);
      formData.append("bath", productData.bath);
      formData.append("car", productData.car);
      formData.append("isFeatured", productData.isFeatured);
      formData.append("inStock", productData.inStock);
      productData.features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });
      formData.append("category", productData.category);
      productData.images.forEach((image) => {
        formData.append(`images`, image);
      });
      productData.previousImages.forEach((image, index) => {
        formData.append(`previousImages[${index}]`, JSON.stringify(image));
      });

      return await editProduct(id, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "product/delete-product",
  async (id, thunkAPI) => {
    try {
      return await removeProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const resetState = createAction("Reset_all_ProductState");

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productData = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProduct = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default productSlice.reducer;
