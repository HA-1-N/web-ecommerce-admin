import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  value: number;
  spinnerLoading: boolean;
  notification: any;
}

const initialState: CounterState = {
  value: 0,
  spinnerLoading: false,
  notification: null,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    showSpinner(state, action) {
      return {
        ...state,
        spinnerLoading: action.payload,
      };
    },

    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    openNotification: (state, action) => {
      return {
        ...state,
        notification: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { showSpinner, increment, decrement, incrementByAmount, openNotification } = counterSlice.actions;

export default counterSlice.reducer;
