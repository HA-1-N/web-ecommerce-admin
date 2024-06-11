import { filterOrderStatusApi, getAllOrderStatusApi } from '@/api/order-status.api';
import { TOTAL_COUNT_HEADER } from '@/constants/page.constant';
import { OrderStatusModels } from '@/model/order-status.model';
import { ParamsModel } from '@/model/page.model';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultOptionType } from 'antd/es/select';

interface OrderStatusState {
  orderStatusDetail: OrderStatusModels | null;
  orderStatusDetails: OrderStatusModels[];
  optionOderStatus: DefaultOptionType[];
  formSearch: OrderStatusModels;
  pageSearch: number;
  totalPage: number;
  countOrderStatus: number;
  loading: boolean;
  error: string | null;
}

const initialState: OrderStatusState = {
  formSearch: {
    status: '',
  },
  orderStatusDetail: null,
  orderStatusDetails: [],
  optionOderStatus: [],
  pageSearch: 1,
  totalPage: 0,
  countOrderStatus: 0,
  loading: false,
  error: null,
};

export const getOptionOrderStatusAsync = createAsyncThunk('orderStatus/getAllOrderStatus', async (_, thunkApi) => {
  try {
    const response = await getAllOrderStatusApi();
    const convertOptionOrderStatus = response?.data?.map((item: OrderStatusModels) => {
      return {
        label: item?.status,
        value: item?.id,
      };
    });
    return convertOptionOrderStatus;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const filterOrderStatusAsync = createAsyncThunk(
  'orderStatus/filter',
  async (data: { body: OrderStatusModels; params: ParamsModel }, thunkApi) => {
    try {
      const response = await filterOrderStatusApi(data.body, data.params);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const orderStatusSlice = createSlice({
  name: 'orderStatus',
  initialState,
  reducers: {
    changeFormSearch: (state, action) => {
      state.formSearch = action.payload;
    },
    changePageSearch: (state, action) => {
      state.pageSearch = action.payload;
    },
    incrementCountOrderStatus: (state) => {
      state.countOrderStatus += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOptionOrderStatusAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOptionOrderStatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.optionOderStatus = action.payload;
        state.error = null;
      })
      .addCase(getOptionOrderStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(filterOrderStatusAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterOrderStatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orderStatusDetails = action.payload.data;
        state.totalPage = parseInt(action.payload.headers[TOTAL_COUNT_HEADER]);
        state.error = null;
      })
      .addCase(filterOrderStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { changeFormSearch, changePageSearch, incrementCountOrderStatus } = orderStatusSlice.actions;
export default orderStatusSlice.reducer;
