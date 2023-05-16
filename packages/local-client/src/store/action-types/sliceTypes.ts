export type CellType = 'code' | 'markdown';
export type Directions = 'up' | 'down';

export interface Cell {
  id: string;
  type: CellType;
  content: string;
}
