@ -2,14 +2,14 @@ import { useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/CodeEditor';
await esbuild.initialize({
  worker: true,
  wasmURL: 'https://www.unpkg.com/esbuild-wasm@0.17.18/esbuild.wasm',
});

function App() {
  const [input, setInput] = useState('');
  // const [code, setCode] = useState('');
  const iframe = useRef<any>();

  const onClick = async () => {
@@ -57,11 +57,21 @@ function App() {

  return (
    <div className='App'>
      <textarea
      <CodeEditor
        initialValue='// Write Code Here'
        onChange={(value: string | undefined) => {
          if (typeof value === 'string') {
            setInput(value);
          } else {
            setInput('');
          }
        }}
      />
      {/* <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: '500px', height: '120px' }}
      ></textarea>
      ></textarea> */}
      <div>
        <button onClick={onClick}>Submit</button>
      </div>