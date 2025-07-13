import { build } from 'esbuild';
import { rimraf } from 'rimraf';
import fs from 'fs';

const isProduction = process.argv.includes('--production');

// Clean dist directory
await rimraf('dist');

// Ensure dist directory exists
fs.mkdirSync('dist', { recursive: true });

try {
  // Build the application
  await build({
    entryPoints: ['src/main.tsx'],
    bundle: true,
    minify: isProduction,
    sourcemap: !isProduction,
    target: ['chrome60', 'firefox60', 'safari11', 'edge79'],
    outfile: 'dist/assets/main.js',
    define: {
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
    },
    loader: {
      '.css': 'css',
      '.png': 'dataurl',
      '.jpg': 'dataurl',
      '.jpeg': 'dataurl',
      '.svg': 'dataurl',
      '.gif': 'dataurl',
      '.woff': 'dataurl',
      '.woff2': 'dataurl',
      '.eot': 'dataurl',
      '.ttf': 'dataurl',
    },
    external: [],
    format: 'iife',
    globalName: 'App',
  });

  // Copy and update HTML file
  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SQ Invest Limited - CRM Demo</title>
    <meta name="description" content="Professional property investment CRM system demonstration" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23374151'><path d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z'/><path d='M3 7l9 6 9-6'/></svg>" />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: system-ui, -apple-system, sans-serif;
        line-height: 1.6;
      }
      
      #loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
      }
      
      .loading-content {
        text-align: center;
      }
      
      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255,255,255,0.2);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .loading-text {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 8px;
      }
      
      .loading-subtext {
        font-size: 14px;
        opacity: 0.8;
      }
    </style>
  </head>
  <body>
    <div id="loading">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading SQ Invest CRM</div>
        <div class="loading-subtext">Preparing demo environment...</div>
      </div>
    </div>
    <div id="root"></div>
    <script src="/assets/main.js"></script>
    <script>
      // Hide loading screen once app is loaded
      window.addEventListener('load', () => {
        setTimeout(() => {
          const loading = document.getElementById('loading');
          if (loading) {
            loading.style.opacity = '0';
            loading.style.transition = 'opacity 0.5s ease';
            setTimeout(() => loading.remove(), 500);
          }
        }, 1000);
      });
    </script>
  </body>
</html>`;

  fs.writeFileSync('dist/index.html', htmlTemplate);
  fs.writeFileSync('dist/404.html', htmlTemplate);

  console.log('✅ Production build completed successfully!');
  console.log('📁 Output directory: dist/');
  console.log('🚀 Ready for deployment to Netlify');

} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}