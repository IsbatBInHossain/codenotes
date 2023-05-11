import { configureStore } from '@reduxjs/toolkit';
import { cellsReducer } from './slices/cellsSlice';

export const store = configureStore({
  reducer: cellsReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// console.log(store.getState());
store.dispatch({
  type: 'cells/insertBeforeCell',
  payload: {
    id: null,
    type: 'markdown',
  },
});
// store.dispatch({
//   type: 'cells/insertBeforeCell',
//   payload: {
//     id: null,
//     type: 'code',
//   },
// });

// console.log(store.getState());
