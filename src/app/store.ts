import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import counterSlice from '@/features/counter/counterSlice';
import userSlice from '@/features/user/user.slice';
import sizeSlice from '@/features/size/size.slice';
import colorSlice from '@/features/color/color.slice';
import brandSlice from '@/features/brand/brand.slice';
import categorySlice from '@/features/category/category.slice';
import productSlice from '@/features/product/product.slice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    size: sizeSlice,
    color: colorSlice,
    brand: brandSlice,
    category: categorySlice,
    product: productSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
