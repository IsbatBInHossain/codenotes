import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import './styles/TextEditor.css';
import { Cell, updateCell, useAppDispatch } from '../store';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const listner = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      )
        return;
      setEditing(false);
    };
    document.addEventListener('click', listner, { capture: true });

    return () => {
      document.removeEventListener('click', listner, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref} className='text-editor'>
        <MDEditor
          value={cell.content}
          onChange={value =>
            dispatch(updateCell({ id: cell.id, content: value || '' }))
          }
        />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)} className='text-editor card'>
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || '# Click to Edit'} />
      </div>
    </div>
  );
};
export default TextEditor;
