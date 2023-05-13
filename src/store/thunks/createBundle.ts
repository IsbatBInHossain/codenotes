import { createAsyncThunk } from '@reduxjs/toolkit';
import bundler from '../../bundler';

export interface BundlerInput {
  input: string;
  id: string;
}

export const createBundle = createAsyncThunk(
  'bundle/create',
  async ({ input, id }: BundlerInput) => {
    const bundledCode = await bundler(input);
    return { id, bundle: bundledCode };
  }
);
