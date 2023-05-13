import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import ResizableComponent from './Resizable';
import './styles/CodeCell.css';
import { Cell, updateCell, useAppDispatch, useAppSelector } from '../store';
import { useCreateBundle } from '../store';
interface CodeCellProps {
  cell: Cell;
}

export default function CodeCell({ cell }: CodeCellProps): JSX.Element {
  const bundle = useAppSelector(state => state.bundlesReducer[cell.id]);
  const cumulativeCode = useAppSelector(state => {
    const { data, order } = state.cellsReducer;
    const cumulativeCode = [];
    const orderedCells = order.map(id => data[id]);
    for (const c of orderedCells) {
      if (c.type === 'code') {
        cumulativeCode.push(c.content);
      }
      if (c.id === cell.id) {
        break;
      }
    }
    return cumulativeCode;
  });

  const [loading, error, runBundler] = useCreateBundle();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!bundle) {
      runBundler({ id: cell.id, input: cumulativeCode.join('\n') });
      return;
    }
    const timer = setTimeout(async () => {
      runBundler({ id: cell.id, input: cumulativeCode.join('\n') });
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell, runBundler, cumulativeCode]);

  const onChange = (value: string | undefined) => {
    dispatch(updateCell({ id: cell.id, content: value || '' }));
  };

  return (
    <ResizableComponent direction='vertical'>
      <div className='codecell-wrapper'>
        <ResizableComponent direction='horizontal'>
          <CodeEditor initialValue={cell.content} onChange={onChange} />
        </ResizableComponent>
        <div className='progress-wrapper'>
          {!bundle || loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={error} />
          )}
        </div>
      </div>
    </ResizableComponent>
  );
}
