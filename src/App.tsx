import { useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-find';
await esbuild.initialize({
  worker: true,
  wasmURL: 'esbuild.wasm',
});

function App() {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref = useRef<esbuild.BuildResult | undefined>();

  const onClick = async () => {
    const esSetting = async () => {
      const result = await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin()],
        define: {
          global: 'window',
        },
      });
      ref.current = result;
    };
    esSetting();
    if (ref.current && ref.current.outputFiles) {
      setCode(ref.current.outputFiles[0]?.text ?? '');
    } else {
      setTimeout(onClick, 100);
    }
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
