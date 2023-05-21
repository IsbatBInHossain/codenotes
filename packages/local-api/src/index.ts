import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cells';

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();
  app.use(createCellsRouter(filename, dir));

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:5173',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    const packagePath = require.resolve(
      '@js-codenotes/local-client/dist/index.html'
    );
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app
      .listen(port, () => {
        console.log('listening on port', port);

        resolve();
      })
      .on('error', reject);
  });
};
