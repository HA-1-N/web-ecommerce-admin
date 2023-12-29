import { getAllColorApi } from '@/api/color.api';
import { ColorModels } from '@/model/color.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultOptionType } from 'antd/es/select';

interface ColorState {
  optionColor: DefaultOptionType[];
  pageSearch: number;
  totalPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: ColorState = {
  optionColor: [],
  pageSearch: 1,
  totalPage: 0,
  loading: false,
  error: null,
};

export const getOptionColorAsync = createAsyncThunk('color/getAllColor', async (_, thunkApi) => {
  try {
    const response = await getAllColorApi();
    const convertOptionColor = response?.data?.map((item: ColorModels) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });
    return convertOptionColor;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOptionColorAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOptionColorAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.optionColor = action.payload;
    });
    builder.addCase(getOptionColorAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = colorSlice.actions;
export default colorSlice.reducer;
