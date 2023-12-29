import { getAllCategoryApi } from '@/api/category.api';
import { CategoryModels } from '@/model/category.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultOptionType } from 'antd/es/select';

interface CategoryState {
  optionCategory: DefaultOptionType[];
  pageSearch: number;
  totalPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  optionCategory: [],
  pageSearch: 1,
  totalPage: 0,
  loading: false,
  error: null,
};

export const getOptionCategoryAsync = createAsyncThunk('category/getAllCategory', async (_, thunkApi) => {
  try {
    const response = await getAllCategoryApi();
    const convertOptionCategory = response?.data?.map((item: CategoryModels) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });
    return convertOptionCategory;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOptionCategoryAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOptionCategoryAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.optionCategory = action.payload;
    });
    builder.addCase(getOptionCategoryAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;
