import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '..';
import axios from 'axios';

export const saveCells = createAsyncThunk('save/cells', async () => {
  const { data, order } = store.getState().cellsReducer;
  const cells = order.map(id => data[id]);
  await axios.post('/cells', { cells });
});
