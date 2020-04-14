import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

// UMD build (for browsers)
export default {
  input: 'src/index.ts',
  output: {
    name: 'ne_http',
    file: pkg.browser,
    format: 'umd',
    globals: {}
  },
  plugins: [
    resolve(), // find external modules
    commonjs(), // convert external modules to ES modules
    typescript(),
    terser({
      include: '*.umd.min.js'
    }),
  ]
};