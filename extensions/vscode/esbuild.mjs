// Bundles the extension into a single file, out/extension.js. `--watch` rebuilds on change; `--production`
// minifies and drops the source map (used when packaging).
import { context } from 'esbuild';

const watch = process.argv.includes('--watch');
const production = process.argv.includes('--production');

const ctx = await context({
  entryPoints: ['src/extension.ts'],
  outfile: 'out/extension.js',
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node20',
  external: ['vscode'],
  minify: production,
  sourcemap: !production,
  logLevel: 'info',
});

if (watch) {
  await ctx.watch();
} else {
  await ctx.rebuild();
  await ctx.dispose();
}
