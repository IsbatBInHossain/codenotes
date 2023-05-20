import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Cell } from '../action-types/sliceTypes';
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
} from '../action-types';
import { fetchCells } from '../thunks/fetchCells';
// import { saveCells } from '../thunks/saveCells';

interface cellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}
const initialState: cellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

export const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    updateCell: (state, action: PayloadAction<UpdateCellAction>) => {
      const { id, content } = action.payload;
      state.data[id].content = content;
    },
    deleteCell: (state, action: PayloadAction<DeleteCellAction>) => {
      delete state.data[action.payload.id];
      state.order = state.order.filter(id => id != action.payload.id);
    },
    moveCell: (state, action: PayloadAction<MoveCellAction>) => {
      const { direction } = action.payload;
      const index = state.order.findIndex(id => id === action.payload.id);
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex > state.order.length - 1) {
        return state;
      }
      state.order[index] = state.order[newIndex];
      state.order[newIndex] = action.payload.id;
    },
    insertAfterCell: (state, action: PayloadAction<InsertCellAfterAction>) => {
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: nanoid(),
      };
      state.data[cell.id] = cell;
      const index = state.order.findIndex(id => id === action.payload.id);
      if (index < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCells.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCells.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.order = action.payload.map(cell => cell.id);
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as cellState['data']);
    });
    builder.addCase(fetchCells.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message) {
        state.error = action.error.message;
      }
    });
    builder.addCase('save/cells/rejected', state => {
      state.error = 'Failed to save';
    });
  },
});

export const { updateCell, moveCell, deleteCell, insertAfterCell } =
  cellsSlice.actions;
export const cellsReducer = cellsSlice.reducer;
