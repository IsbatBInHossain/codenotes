import { CellType, Directions } from './sliceTypes';

export interface UpdateCellAction {
  id: string;
  content: string;
}
export interface DeleteCellAction {
  id: string;
}

export interface MoveCellAction {
  id: string;
  direction: Directions;
}
export interface InsertBeforeCellAction {
  id: string | null;
  type: CellType;
}
