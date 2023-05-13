import { createSlice } from '@reduxjs/toolkit';
import { createBundle } from '../thunks/createBundle';
// import { BundleCompleteAction, BundleStartAction } from '../action-types';

export interface BundleState {
  [key: string]:
    | {
        loading: boolean;
        error: string;
        code: string;
      }
    | undefined;
}

const initialState: BundleState = {};

const bundleSlice = createSlice({
  name: 'bundle',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createBundle.pending, (state, action) => {
      state[action.meta.arg.id] = {
        loading: true,
        error: '',
        code: '',
      };
    });
    builder.addCase(createBundle.fulfilled, (state, action) => {
      state[action.meta.arg.id] = {
        loading: false,
        error: '',
        code: action.payload.bundle.code,
      };
    });
    builder.addCase(createBundle.rejected, (state, action) => {
      state[action.meta.arg.id] = {
        loading: false,
        error: action.error.message || '',
        code: '',
      };
    });
  },
});

// export const { bundleComplete, bundleStart } = bundleSlice.actions;
export const bundlesReducer = bundleSlice.reducer;
