import { getAllBrandApi } from '@/api/brand.api';
import { BrandModels } from '@/model/brand.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultOptionType } from 'antd/es/select';

interface BrandState {
  optionBrand: DefaultOptionType[];
  pageSearch: number;
  totalPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: BrandState = {
  optionBrand: [],
  pageSearch: 1,
  totalPage: 0,
  loading: false,
  error: null,
};

export const getOptionBrandAsync = createAsyncThunk('brand/getAllBrand', async (_, thunkApi) => {
  try {
    const response = await getAllBrandApi();
    const convertOptionBrand = response?.data?.map((item: BrandModels) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });
    return convertOptionBrand;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOptionBrandAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOptionBrandAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.optionBrand = action.payload;
    });
    builder.addCase(getOptionBrandAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = brandSlice.actions;
export default brandSlice.reducer;
