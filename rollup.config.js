/* eslint-disable @typescript-eslint/no-var-requires */
const typescript = require('@rollup/plugin-typescript');

const input = [
  'src/useDynamicRef.ts',
  'src/useEventListener.ts',
  'src/useKeyMap.ts',
  'src/useLazy.ts',
  'src/useList.ts',
];
const outputDir = 'dist';
const external = ['react'];
const plugins = [typescript({ tsconfig: './tsconfig.build.json' })];

module.exports = [
  {
    input,
    output: {
      dir: outputDir,
      format: 'cjs',
    },
    external,
    plugins,
  },
  {
    input,
    output: {
      entryFileNames: '[name].mjs',
      dir: outputDir,
      format: 'es',
    },
    external,
    plugins,
  },
];
