import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundler from '../bundler';
import ResizableComponent from './Resizable';
import './styles/CodeCell.css';
import { Cell, updateCell, useAppDispatch } from '../store';
interface CodeCellProps {
  cell: Cell;
}

export default function CodeCell({ cell }: CodeCellProps): JSX.Element {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(cell.content);
      setCode(output.code);
      setError(output.error);
    }, 1000);
    return () => clearTimeout(timer);
  }, [cell.content]);

  const onChange = (value: string | undefined) => {
    dispatch(updateCell({ id: cell.id, content: value || '' }));
  };

  return (
    <ResizableComponent direction='vertical'>
      <div className='codecell-wrapper'>
        <ResizableComponent direction='horizontal'>
          <CodeEditor initialValue={cell.content} onChange={onChange} />
        </ResizableComponent>
        <Preview code={code} error={error} />
      </div>
    </ResizableComponent>
  );
}
