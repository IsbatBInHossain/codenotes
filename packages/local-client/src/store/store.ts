import { bundlesReducer } from './slices/bundlesSlice';
import { configureStore } from '@reduxjs/toolkit';
import { cellsReducer } from './slices/cellsSlice';
import { persistMiddleware } from './middlewares/persist-middleware';

export const store = configureStore({
  reducer: {
    cellsReducer,
    bundlesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(persistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// store.dispatch({
//   type: 'cells/insertAfterCell',
//   payload: {
//     id: null,
//     type: 'markdown',
//   },
// });
// store.dispatch({
//   type: 'cells/insertAfterCell',
//   payload: {
//     id: null,
//     type: 'code',
//   },
// });
// store.dispatch({
//   type: 'cells/insertAfterCell',
//   payload: {
//     id: null,
//     type: 'markdown',
//   },
// });
