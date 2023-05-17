import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cell } from '..';

export const fetchCells = createAsyncThunk('fetch/cells', async () => {
  const { data }: { data: Cell[] } = await axios.get('/cells');
  return data;
});
