import { getCurrentUserByIdApi } from '@/api/user.api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface InitialStateProps {
  currentUser: any;
  countUser: number;
}

const initialState = { currentUser: null } as InitialStateProps;

export const getCurrentUserByIdAsync = createAsyncThunk('user/get-by-id', async (id: number) => {
  const response = await getCurrentUserByIdApi(id);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
    incrementCountUser: (state) => {
      state.countUser += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserByIdAsync.fulfilled, (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    });
  },
});

export const { setCurrentUser, incrementCountUser } = userSlice.actions;
export default userSlice.reducer;
