import { useRef, useEffect } from 'react';
import './styles/Preview.css';

interface PreviewProps {
  code: string;
  error: string;
}
const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>html {background-color:white;}</style>
    <title>Document</title>
  </head>
  <body>
    <div id= "root"><div>
    <script>
    const handleError = (err) =>{
      const root = document.getElementById('root');
      root.innerHTML = '<div style="color:red;"><h4>Runtime Error</h4>'+ err +'</div>'
      console.error(err);
    }

    window.addEventListener('error', e => {
      e.preventDefault();
      handleError(e.error);
    });

    window.addEventListener('message', e => {
      try {
        eval(e.data);
      } catch(err){
        handleError(err)
      }
    },false)
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframe.current) {
      iframe.current.srcdoc = html;
      setTimeout(() => {
        if (iframe.current) {
          iframe.current.contentWindow?.postMessage(code, '*');
        }
      }, 50);
    }
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe
        title='preview'
        ref={iframe}
        sandbox='allow-scripts'
        srcDoc={html}
      />
      {error && (
        <div className='preview-error'>
          <h4 style={{ fontWeight: 'bold' }}>Build Error</h4>
          {error}
        </div>
      )}
    </div>
  );
};
export default Preview;
