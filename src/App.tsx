import { useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-find';

await esbuild.initialize({
  worker: true,
  wasmURL: 'esbuild.wasm',
});
const result = await esbuild.build({
  entryPoints: ['index.js'],
  bundle: true,
  write: false,
  plugins: [unpkgPathPlugin()],
});

function App() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    setCode(result.outputFiles[0].text);
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
