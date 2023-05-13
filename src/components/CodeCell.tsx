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

  const [loading, error, runBundler] = useCreateBundle();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const timer = setTimeout(async () => {
      runBundler({ id: cell.id, input: cell.content });
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell]);

  const onChange = (value: string | undefined) => {
    dispatch(updateCell({ id: cell.id, content: value || '' }));
  };

  return (
    <ResizableComponent direction='vertical'>
      <div className='codecell-wrapper'>
        <ResizableComponent direction='horizontal'>
          <CodeEditor initialValue={cell.content} onChange={onChange} />
        </ResizableComponent>
        {bundle && <Preview code={bundle.code} error={bundle.error} />}
      </div>
    </ResizableComponent>
  );
}
