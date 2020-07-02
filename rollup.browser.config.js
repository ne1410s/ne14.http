import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

// UMD build (for browsers)
export default {
  input: 'src/index.ts',
  external: ['jws', '@ne1410s/codl'],
  output: {
    name: pkg.displayName,
    file: pkg.browser,
    format: 'umd',
    globals: {
      jws: 'jws',
      '@ne1410s/codl': 'ne_codl',
    },
  },
  plugins: [typescript()],
};
