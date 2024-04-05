import { getAllIdNameProductApi } from '@/api/product.api';
import { ProductIdNameModels } from '@/model/product.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultOptionType } from 'antd/es/select';
interface ProductState {
  optionProduct: DefaultOptionType[];
  pageSearch: number;
  totalPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  optionProduct: [],
  pageSearch: 1,
  totalPage: 0,
  loading: false,
  error: null,
};

export const getOptionProductAsync = createAsyncThunk('product/getAllProduct', async (_, thunkApi) => {
  try {
    const response = await getAllIdNameProductApi();
    const convertOptionProduct = response?.data?.map((item: ProductIdNameModels) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });
    return convertOptionProduct;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOptionProductAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOptionProductAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.optionProduct = action.payload;
    });
    builder.addCase(getOptionProductAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = productSlice.actions;
export default productSlice.reducer;
