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
  const result = await esbuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      global: 'window',
    },
  });
  return result.outputFiles[0].text;
};
