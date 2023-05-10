import { configureStore } from '@reduxjs/toolkit';
import { cellsReducer } from './slices/cellsSlice';

export const store = configureStore({
  reducer: cellsReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
