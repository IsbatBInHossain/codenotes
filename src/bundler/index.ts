import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service = false;
export default async (rawCode: string) => {
  if (!service) {
    await esbuild.initialize({
      worker: true,
      wasmURL: 'https://www.unpkg.com/esbuild-wasm@0.17.18/esbuild.wasm',
    });
    service = true;
  }
  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        global: 'window',
      },
    });
    return {
      code: result.outputFiles[0].text,
      error: '',
    };
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    return {
      code: '',
      error: message,
    };
  }
};
