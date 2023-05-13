import { bundlesReducer } from './slices/bundlesSlice';
import { configureStore } from '@reduxjs/toolkit';
import { cellsReducer } from './slices/cellsSlice';

export const store = configureStore({
  reducer: {
    cellsReducer,
    bundlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.dispatch({
  type: 'cells/insertAfterCell',
  payload: {
    id: null,
    type: 'markdown',
  },
});
store.dispatch({
  type: 'cells/insertAfterCell',
  payload: {
    id: null,
    type: 'code',
  },
});
store.dispatch({
  type: 'cells/insertAfterCell',
  payload: {
    id: null,
    type: 'markdown',
  },
});
