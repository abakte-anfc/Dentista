const esbuild = require('esbuild');
esbuild.buildSync({ entryPoints: { carousel: 'src/carousel-entry.jsx', 'scroll-reveal': 'src/scroll-reveal-entry.jsx' }, bundle: true, splitting: true, minify: true, format: 'esm', target: ['es2020'], outdir: 'assets/js/vendor', chunkNames: 'effects/[name]-[hash]', define: { 'process.env.NODE_ENV': '"production"' }, legalComments: 'linked' });
