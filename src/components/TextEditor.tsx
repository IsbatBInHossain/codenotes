import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import './styles/TextEditor.css';

const TextEditor: React.FC = () => {
  const [value, setValue] = useState('# Edit text here ...');
  const [editing, setEditing] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listner = (event: MouseEvent) => {
      if (
        divRef.current &&
        event.target &&
        divRef.current.contains(event.target as Node)
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
      <div ref={divRef} className='text-editor'>
        <MDEditor value={value} onChange={v => setValue(v || '')} />
      </div>
    );
  }
  return (
    <div onClick={() => setEditing(true)} className='text-editor card'>
      <div className='card-content'>
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};
export default TextEditor;
