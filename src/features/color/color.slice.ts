import { filterColorApi, getAllColorApi, getColorByIdApi } from '@/api/color.api';
import { TOTAL_COUNT_HEADER } from '@/constants/page.constant';
import { ColorModels } from '@/model/color.model';
import { ParamsModel } from '@/model/page.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultOptionType } from 'antd/es/select';

interface ColorState {
  colorDetail: ColorModels | null;
  colorDetails: ColorModels[];
  optionColor: DefaultOptionType[];
  formSearch: ColorModels;
  pageSearch: number;
  totalPage: number;
  countColor: number;
  loading: boolean;
  error: string | null;
}

const initialState: ColorState = {
  formSearch: {
    name: '',
    code: '',
  },
  colorDetail: null,
  colorDetails: [],
  optionColor: [],
  pageSearch: 1,
  totalPage: 0,
  countColor: 0,
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

export const filterColorAsync = createAsyncThunk(
  'color/filter',
  async (data: { body: ColorModels; params: ParamsModel }, thunkApi) => {
    try {
      const response = await filterColorApi(data.body, data.params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getColorByIdAsync = createAsyncThunk('color/get-by-id', async (id: number | undefined, thunkApi) => {
  try {
    const response = await getColorByIdApi(id);
    return response;
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

    changeFormSearch(state, action) {
      return {
        ...state,
        formSearch: action.payload,
      };
    },

    changePageSearch(state, action) {
      return {
        ...state,
        pageSearch: action.payload,
      };
    },

    incrementCountColor(state) {
      return {
        ...state,
        countColor: state.countColor + 1,
      };
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

    builder.addCase(filterColorAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterColorAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.colorDetails = action.payload?.data;
      state.totalPage = parseInt(action.payload.headers[TOTAL_COUNT_HEADER]) || 0;
      state.error = null;
    });
    builder.addCase(filterColorAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getColorByIdAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getColorByIdAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.colorDetail = action.payload.data;
      state.error = null;
    });
    builder.addCase(getColorByIdAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, changeFormSearch, changePageSearch, incrementCountColor } = colorSlice.actions;
export default colorSlice.reducer;
