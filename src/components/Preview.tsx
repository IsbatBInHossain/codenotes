import { useRef, useEffect } from 'react';

interface PreviewProps {
  code: string;
}
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

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframe.current) {
      iframe.current.srcdoc = html;
      iframe.current.contentWindow?.postMessage(code, '*');
    }
  }, [code]);

  return (
    <iframe
      title='preview'
      ref={iframe}
      sandbox='allow-scripts'
      srcDoc={html}
    />
  );
};
export default Preview;
