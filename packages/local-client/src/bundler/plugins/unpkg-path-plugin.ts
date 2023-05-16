import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle entry file
      build.onResolve({ filter: /(^index.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // Handle relative path in a module
      build.onResolve({ filter: /^\.+\// }, (args: esbuild.OnResolveArgs) => {
        return {
          namespace: 'a',
          path: new URL(args.path, `https://www.unpkg.com${args.resolveDir}/`)
            .href,
        };
      });

      // Handle root file of a module
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        return {
          namespace: 'a',
          path: `https://www.unpkg.com/${args.path}`,
        };
      });
    },
  };
};
