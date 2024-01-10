import { deleteBrandApi, filterBrandApi, getAllBrandApi, getBrandByIdApi } from '@/api/brand.api';
import { TOTAL_COUNT_HEADER } from '@/constants/page.constant';
import { BrandModels } from '@/model/brand.model';
import { ParamsModel } from '@/model/page.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultOptionType } from 'antd/es/select';

interface BrandState {
  brandDetail: BrandModels | null;
  brandDetails: BrandModels[];
  optionBrand: DefaultOptionType[];
  formSearch: BrandModels;
  pageSearch: number;
  totalPage: number;
  countBrand: number;
  loading: boolean;
  error: string | null;
}

const initialState: BrandState = {
  formSearch: {
    name: '',
  },
  brandDetail: null,
  brandDetails: [],
  optionBrand: [],
  pageSearch: 1,
  totalPage: 0,
  countBrand: 0,
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

export const filterBrandAsync = createAsyncThunk(
  'brand/filter',
  async (data: { body: BrandModels; params: ParamsModel }, thunkApi) => {
    try {
      const response = await filterBrandApi(data.body, data.params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getBrandByIdAsync = createAsyncThunk('brand/get-by-id', async (id: number | undefined, thunkApi) => {
  try {
    const response = await getBrandByIdApi(id);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteBrandAsync = createAsyncThunk('brand/detele', async (id: number | undefined, thunkApi) => {
  try {
    const response = await deleteBrandApi(id);
    return response;
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

    incrementCountBrand(state) {
      return {
        ...state,
        countBrand: state.countBrand + 1,
      };
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

    builder.addCase(filterBrandAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(filterBrandAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.brandDetails = action.payload?.data;
      state.totalPage = parseInt(action.payload.headers[TOTAL_COUNT_HEADER]) || 0;
      state.error = null;
    });

    builder.addCase(filterBrandAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getBrandByIdAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBrandByIdAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.brandDetail = action.payload.data;
      state.error = null;
    });
    builder.addCase(getBrandByIdAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteBrandAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBrandAsync.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteBrandAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, changeFormSearch, changePageSearch, incrementCountBrand } = brandSlice.actions;
export default brandSlice.reducer;
