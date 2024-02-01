import { findHotCategoryByIdApi, getAllHotCategoryApi } from '@/api/hot-category.api';
import { TOTAL_COUNT_HEADER } from '@/constants/page.constant';
import { HotCategoryModels } from '@/model/hot-category.model';
import { ParamsModel } from '@/model/page.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultOptionType } from 'antd/es/select';

interface HotCategoryState {
  hotCategoryDetail: HotCategoryModels | null;
  hotCategoryDetails: HotCategoryModels[];
  optionHotCategory: DefaultOptionType[];
  formSearch: HotCategoryModels;
  pageSearch: number;
  totalPage: number;
  countHotCategory: number;
  countProductHotCategory: number;
  loading: boolean;
  error: string | null;
}

const initialState: HotCategoryState = {
  formSearch: {
    id: null,
  },
  hotCategoryDetail: null,
  hotCategoryDetails: [],
  optionHotCategory: [],
  pageSearch: 1,
  totalPage: 0,
  countHotCategory: 0,
  countProductHotCategory: 0,
  loading: false,
  error: null,
};

export const getOptionHotCategoryAsync = createAsyncThunk(
  'hotCategory/getOptionHotCategory',
  async (data: { params: ParamsModel }, thunkApi) => {
    try {
      const response = await getAllHotCategoryApi(data.params);
      const convertOptionHotCategory = response?.data?.map((item: HotCategoryModels) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      });
      return convertOptionHotCategory;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getAllHotCategoryAsync = createAsyncThunk(
  'hotCategory/getAllHotCategorys',
  async (data: { params: ParamsModel }, thunkApi) => {
    try {
      const response = await getAllHotCategoryApi(data.params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const findHotCategoryByIdAsync = createAsyncThunk(
  'hotCategory/getHotCategoryByID',
  async (id: number | undefined | null, thunkApi) => {
    try {
      const response = await findHotCategoryByIdApi(Number(id));
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const hotCategorySlice = createSlice({
  name: 'hotCategory',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetData: (state) => {
      state.hotCategoryDetail = null;
      state.hotCategoryDetails = [];
      state.optionHotCategory = [];
      state.formSearch = {
        id: null,
      };
      state.pageSearch = 1;
      state.totalPage = 0;
      state.countHotCategory = 0;
      state.loading = false;
      state.error = null;
    },
    changeFormSearch: (state, action) => {
      state.formSearch = action.payload;
    },
    changePageSearch: (state, action) => {
      state.pageSearch = action.payload;
    },

    incrementCountHotCategory: (state) => {
      return {
        ...state,
        countHotCategory: state.countHotCategory + 1,
      };
    },

    incrementCountProductHotCategory: (state) => {
      return {
        ...state,
        countProductHotCategory: state.countProductHotCategory + 1,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOptionHotCategoryAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOptionHotCategoryAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.optionHotCategory = action.payload;
    });
    builder.addCase(getOptionHotCategoryAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getAllHotCategoryAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllHotCategoryAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.hotCategoryDetails = action.payload?.data;
      state.totalPage = parseInt(action.payload.headers[TOTAL_COUNT_HEADER]) || 0;
      state.error = null;
    });
    builder.addCase(getAllHotCategoryAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error as string;
    });
    builder.addCase(findHotCategoryByIdAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findHotCategoryByIdAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.hotCategoryDetail = action.payload.data;
      state.error = null;
    });
    builder.addCase(findHotCategoryByIdAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error as string;
    });
  },
});

export const {
  clearError,
  changeFormSearch,
  changePageSearch,
  incrementCountHotCategory,
  incrementCountProductHotCategory,
} = hotCategorySlice.actions;
export default hotCategorySlice.reducer;
