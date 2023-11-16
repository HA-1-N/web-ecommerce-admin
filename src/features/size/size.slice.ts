import { filterSizeApi } from '@/api/size.api';
import { TOTAL_COUNT_HEADER } from '@/constants/page.constant';
import { ParamsModel } from '@/model/page.model';
import { SizeModel } from '@/model/size.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface SizeState {
  sizeDetails: SizeModel[];
  formSearch: SizeModel;
  pageSearch: number;
  totalPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: SizeState = {
  sizeDetails: [],
  formSearch: {
    name: null,
  },
  pageSearch: 1,
  totalPage: 0,
  loading: false,
  error: null,
};

export const filterSizeAsync = createAsyncThunk(
  'size/filterSize',
  async (data: { body: SizeModel; params: ParamsModel }, thunkApi) => {
    try {
      const response = await filterSizeApi(data.body, data.params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const sizeSlice = createSlice({
  name: 'size',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    changeFormSearch(state, action) {
      return {
        ...state,
        formSearch: action.payload,
      };
      //   state.formSearch = action.payload;
    },
    changePageSearch(state, action) {
      return {
        ...state,
        pageSearch: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(filterSizeAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterSizeAsync.fulfilled, (state, action) => {
      state.sizeDetails = action.payload.data;
      state.totalPage = parseInt(action.payload.headers[TOTAL_COUNT_HEADER]) || 0;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(filterSizeAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { changeFormSearch, changePageSearch } = sizeSlice.actions;
export default sizeSlice.reducer;
