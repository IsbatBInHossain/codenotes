import { useRef, useState } from 'react';
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
  const iframe = useRef<any>();

  const onClick = async () => {
    const esSetting = async () => {
      iframe.current.srcdoc = html;
      const result = await esbuild.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        define: {
          global: 'window',
        },
      });
      iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
    };
    esSetting();
  };

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id= "root"><div>
    <script>
    window.addEventListener('message', e => {
      try {
        eval(e.data);
      } catch(err){
        const root = document.getElementById('root');
        root.innerHTML = '<div style="color:red;"><h4>Runtime Error</h4>'+ err +'</div>'
        console.error(err)
      }
    },false)
    </script>
  </body>
</html>
`;

  return (
    <div className='App'>
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
      ></textarea> */}
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      {/* <pre>{code}</pre> */}
      <iframe
        title='preview'
        ref={iframe}
        sandbox='allow-scripts'
        srcDoc={html}
      ></iframe>
    </div>
  );
}

export default App;
