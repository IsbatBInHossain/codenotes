import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundler from '../bundler';
import ResizableComponent from './Resizable';
import './styles/CodeCell.css';

function App() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(input);
      setCode(output.code);
      setError(output.error);
    }, 1000);
    return () => clearTimeout(timer);
  }, [input]);

  const onChange = (value: string | undefined) => {
    if (typeof value === 'string') {
      setInput(value);
    } else {
      setInput('');
    }
  };

  return (
    <ResizableComponent direction='vertical'>
      <div className='codecell-wrapper'>
        <ResizableComponent direction='horizontal'>
          <CodeEditor initialValue='// Write Code Here' onChange={onChange} />
        </ResizableComponent>
        <Preview code={code} error={error} />
      </div>
    </ResizableComponent>
  );
}

export default App;
