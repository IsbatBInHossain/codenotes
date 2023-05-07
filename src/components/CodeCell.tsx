import { useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundler from '../bundler';
import ResizableComponent from './Resizable';
import './CodeCell.css';

function App() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const esSetting = async () => {
      const output = await bundler(input);
      setCode(output);
    };
    esSetting();
  };
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
        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
        <Preview code={code} />
      </div>
    </ResizableComponent>
  );
}

export default App;
