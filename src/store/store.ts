import { configureStore } from '@reduxjs/toolkit';
import { cellsReducer } from './slices/cellsSlice';

export const store = configureStore({
  reducer: cellsReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.dispatch({
  type: 'cells/insertBeforeCell',
  payload: {
    id: null,
    type: 'markdown',
  },
});
store.dispatch({
  type: 'cells/insertBeforeCell',
  payload: {
    id: null,
    type: 'code',
  },
});
store.dispatch({
  type: 'cells/insertBeforeCell',
  payload: {
    id: null,
    type: 'markdown',
  },
});
