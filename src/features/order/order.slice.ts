import { filterOrderApi } from '@/api/order.api';
import { TOTAL_COUNT_HEADER } from '@/constants/page.constant';
import { OrderDetailModels, OrderModels } from '@/model/order.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface OrderState {
  orderDetail: OrderModels | null;
  orderDetails: OrderDetailModels[];
  formSearch: OrderModels;
  pageSearch: number;
  totalPage: number;
  countOrder: number;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  formSearch: {
    orderDate: '',
  },
  orderDetail: null,
  orderDetails: [],
  pageSearch: 1,
  totalPage: 0,
  countOrder: 0,
  loading: false,
  error: null,
};

export const filterOrderAsync = createAsyncThunk(
  'order/filter',
  async (data: { body: OrderModels; params: any }, thunkApi) => {
    try {
      const response = await filterOrderApi(data.body, data.params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    changeFormSearch: (state, action) => {
      state.formSearch = action.payload;
    },
    changePageSearch: (state, action) => {
      state.pageSearch = action.payload;
    },
    incrementCountOrder: (state) => {
      state.countOrder += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload.data;
        state.totalPage = parseInt(action.payload.headers[TOTAL_COUNT_HEADER]);
        state.error = null;
      })
      .addCase(filterOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { changeFormSearch, changePageSearch, incrementCountOrder } = orderSlice.actions;
export default orderSlice.reducer;
