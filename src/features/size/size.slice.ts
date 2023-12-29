import { filterSizeApi, getAllSizeApi } from '@/api/size.api';
import { TOTAL_COUNT_HEADER } from '@/constants/page.constant';
import { ParamsModel } from '@/model/page.model';
import { SizeModel } from '@/model/size.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultOptionType } from 'antd/es/select';

interface SizeState {
  sizeDetails: SizeModel[];
  optionSize: DefaultOptionType[];
  formSearch: SizeModel;
  pageSearch: number;
  totalPage: number;
  countSize: number;
  loading: boolean;
  error: string | null;
}

const initialState: SizeState = {
  sizeDetails: [],
  optionSize: [],
  formSearch: {
    name: null,
  },
  pageSearch: 1,
  totalPage: 0,
  countSize: 0,
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

export const getOptionSizeAsync = createAsyncThunk('size/getAllSize', async (_, thunkApi) => {
  try {
    const response = await getAllSizeApi();
    const convertOptionSize = response?.data?.map((item: SizeModel) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });
    return convertOptionSize;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

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
    incrementCountSize(state) {
      return {
        ...state,
        countSize: state.countSize + 1,
      };
    },
    decrementCountSize(state) {
      return {
        ...state,
        countSize: state.countSize - 1,
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
    builder.addCase(getOptionSizeAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOptionSizeAsync.fulfilled, (state, action) => {
      state.optionSize = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getOptionSizeAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { changeFormSearch, changePageSearch, incrementCountSize } = sizeSlice.actions;
export default sizeSlice.reducer;
