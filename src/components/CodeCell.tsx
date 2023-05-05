import { useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import bundler from '../bundler';

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
    <div className='App'>
      <CodeEditor initialValue='// Write Code Here' onChange={onChange} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
}

export default App;
