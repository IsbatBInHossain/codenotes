import { Middleware } from 'redux';
import {
  deleteCell,
  insertAfterCell,
  moveCell,
  saveCells,
  updateCell,
} from '..';
// import axios from 'axios';

export const persistMiddleware: Middleware = storeApi => {
  let timer: NodeJS.Timeout;
  return next => async action => {
    const actionArray = [
      updateCell.type,
      moveCell.type,
      insertAfterCell.type,
      deleteCell.type,
    ];
    if (actionArray.includes(action.type)) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        saveCells(storeApi.getState);
      }, 250);

      return next(action);
    }

    return next(action);
  };
};
