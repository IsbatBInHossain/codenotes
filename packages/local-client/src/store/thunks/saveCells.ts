import { createAction } from '@reduxjs/toolkit';
import { RootState, store } from '..';
import axios from 'axios';

export const saveCells = async (getState: () => RootState) => {
  const { data, order } = getState().cellsReducer;
  const cells = order.map((id: string) => data[id]);
  try {
    await axios.post('/cells', { cells });
  } catch (err: unknown) {
    const saveError = createAction('save/cells/rejected');
    store.dispatch(saveError());
  }
};
