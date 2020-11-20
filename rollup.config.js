/* eslint-disable @typescript-eslint/no-var-requires */
const typescript = require('@rollup/plugin-typescript');
const packageFile = require('./package');

module.exports = {
  input: [
    'src/useDynamicRef.ts',
    'src/useEventListener.ts',
    'src/useKeyMap.ts',
    'src/useLazy.ts',
    'src/useList.ts',
  ],
  output: {
    dir: 'dist',
    format: 'es',
    name: packageFile.name,
  },
  external: ['react'],
  plugins: [typescript()],
};
