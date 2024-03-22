import { filterShippingMethodApi, getShippingMethodByIdApi } from '@/api/shipping-method.api';
import { TOTAL_COUNT_HEADER } from '@/constants/page.constant';
import { ParamsModel } from '@/model/page.model';
import { ShippingMethodModels } from '@/model/shipping-method.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultOptionType } from 'antd/es/select';

interface ShippingMethodState {
  shippingMethodDetail: ShippingMethodModels | null;
  shippingMethodDetails: ShippingMethodModels[];
  optionDetail: DefaultOptionType[];
  formSearch: ShippingMethodModels;
  pageSearch: number;
  totalPage: number;
  countShippingMethod: number;
  loading: boolean;
  error: string | null;
}

const initialState: ShippingMethodState = {
  formSearch: {
    method: '',
  },
  shippingMethodDetail: null,
  shippingMethodDetails: [],
  optionDetail: [],
  pageSearch: 1,
  totalPage: 0,
  countShippingMethod: 0,
  loading: false,
  error: null,
};

export const filterShippingMethodAsync = createAsyncThunk(
  'shippingMethod/filter',
  async (data: { body: ShippingMethodModels; params: ParamsModel }, thunkApi) => {
    try {
      const response = await filterShippingMethodApi(data.body, data.params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const getShippingMethodByIdAsync = createAsyncThunk(
  'shippingMethod/get-by-id',
  async (id: number | undefined, thunkApi) => {
    try {
      const res = await getShippingMethodByIdApi(id);
      return res;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const shippingMethodSlice = createSlice({
  name: 'shippingMethod',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    changeFormSearch: (state, action) => {
      state.formSearch = action.payload;
    },
    changePageSearch: (state, action) => {
      state.pageSearch = action.payload;
    },
    incrementCountShippingMethod(state) {
      return {
        ...state,
        countShippingMethod: state.countShippingMethod + 1,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterShippingMethodAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterShippingMethodAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingMethodDetails = action.payload?.data;
        state.totalPage = parseInt(action.payload.headers[TOTAL_COUNT_HEADER]);
        state.error = null;
      })
      .addCase(filterShippingMethodAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getShippingMethodByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShippingMethodByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingMethodDetail = action.payload?.data;
        state.error = null;
      })
      .addCase(getShippingMethodByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { changeFormSearch, changePageSearch, incrementCountShippingMethod } = shippingMethodSlice.actions;
export default shippingMethodSlice.reducer;
