import { useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
await esbuild.initialize({
  worker: true,
  wasmURL: 'https://www.unpkg.com/esbuild-wasm@0.17.18/esbuild.wasm',
});

function App() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const esSetting = async () => {
      const result = await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        define: {
          global: 'window',
        },
      });
      setCode(result.outputFiles[0].text);
    };
    esSetting();
  };

  return (
    <div className='App'>
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: '500px', height: '120px' }}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
