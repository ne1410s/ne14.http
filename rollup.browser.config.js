import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

// UMD build (for browsers)
export default {
  input: 'src/index.ts',
  external: [
    'jws'
  ],
  output: {
    name: pkg.displayName,
    file: pkg.browser,
    format: 'umd',
    globals: {
      'jws': 'jws'
    }
  },
  plugins: [
    typescript()
  ]
};