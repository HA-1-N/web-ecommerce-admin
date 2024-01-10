import { filterCategoryApi, getAllCategoryApi, getCategoryByIdApi } from '@/api/category.api';
import { TOTAL_COUNT_HEADER } from '@/constants/page.constant';
import { CategoryModels } from '@/model/category.model';
import { ParamsModel } from '@/model/page.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultOptionType } from 'antd/es/select';

interface CategoryState {
  categoryDetail: CategoryModels | null;
  categoryDetails: CategoryModels[];
  optionCategory: DefaultOptionType[];
  formSearch: CategoryModels;
  pageSearch: number;
  totalPage: number;
  countCategory: number;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  formSearch: {
    name: '',
  },
  categoryDetail: null,
  categoryDetails: [],
  optionCategory: [],
  pageSearch: 1,
  totalPage: 0,
  countCategory: 0,
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

export const filterCategoryAsync = createAsyncThunk(
  'category/filter',
  async (data: { body: CategoryModels; params: ParamsModel }, thunkApi) => {
    try {
      const response = await filterCategoryApi(data.body, data.params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getCategoryByIdAsync = createAsyncThunk('category/get-by-id', async (id: number | undefined, thunkApi) => {
  try {
    const response = await getCategoryByIdApi(id);
    return response;
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

    incrementCountCategory(state) {
      return {
        ...state,
        countCategory: state.countCategory + 1,
      };
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

    builder.addCase(filterCategoryAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterCategoryAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryDetails = action.payload?.data;
      state.totalPage = parseInt(action.payload.headers[TOTAL_COUNT_HEADER]) || 0;
      state.error = null;
    });
    builder.addCase(filterCategoryAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getCategoryByIdAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoryByIdAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryDetail = action.payload.data;
      state.error = null;
    });
    builder.addCase(getCategoryByIdAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, changeFormSearch, changePageSearch, incrementCountCategory } = categorySlice.actions;
export default categorySlice.reducer;
