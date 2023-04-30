import { useState } from 'react';

import * as esbuild from 'esbuild-wasm';

await esbuild.initialize({
  worker: true,
  wasmURL: 'esbuild.wasm',
});

function App() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = () => {
    esbuild
      .transform(input, {
        loader: 'tsx',
        target: 'es2015',
      })
      .then(result => {
        setCode(result.code);
      });
  };

  return (
    <div className='App'>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
