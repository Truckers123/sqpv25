import { build } from 'esbuild';
import { stylePlugin } from 'esbuild-style-plugin';
import { rimraf } from 'rimraf';
import fs from 'fs';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('--production');

console.log('🚀 Starting Vercel-optimized build...');

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
    target: ['es2020'],
    outfile: 'dist/assets/main.js',
    define: {
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
    },
    plugins: [
      stylePlugin({
        postcss: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        },
      }),
    ],
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
    splitting: false,
    chunkNames: 'chunks/[name]-[hash]',
    assetNames: 'assets/[name]-[hash]',
    publicPath: '/',
  });

  // Create optimized HTML
  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SQ Invest Limited - Professional CRM</title>
    <meta name="description" content="Advanced property investment CRM with analytics, task management, and client tracking" />
    <meta name="keywords" content="CRM, property investment, client management, analytics" />
    <meta name="author" content="SQ Invest Limited" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23667eea'><path d='M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z'/></svg>" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        background-color: #f8fafc;
      }
      
      #loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
        font-family: 'Inter', sans-serif;
      }
      
      .loading-content {
        text-align: center;
        animation: fadeIn 0.5s ease-in;
      }
      
      .loading-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255,255,255,0.2);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 24px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .loading-text {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 8px;
      }
      
      .loading-subtext {
        font-size: 16px;
        opacity: 0.9;
        margin-bottom: 16px;
      }
      
      .loading-features {
        font-size: 14px;
        opacity: 0.8;
      }
      
      .feature {
        display: inline-block;
        margin: 0 8px;
        padding: 4px 12px;
        background: rgba(255,255,255,0.1);
        border-radius: 20px;
        margin-bottom: 8px;
      }
      
      /* Ensure smooth transitions */
      #root {
        min-height: 100vh;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      #root.loaded {
        opacity: 1;
      }
    </style>
  </head>
  <body>
    <div id="loading">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <div class="loading-text">SQ Invest CRM</div>
        <div class="loading-subtext">Loading advanced features...</div>
        <div class="loading-features">
          <div class="feature">📊 Analytics</div>
          <div class="feature">👥 Contact Management</div>
          <div class="feature">✅ Task Tracking</div>
          <div class="feature">📅 Calendar</div>
          <div class="feature">📧 Email System</div>
        </div>
      </div>
    </div>
    <div id="root"></div>
    <script>
      // Performance optimization
      const loadingElement = document.getElementById('loading');
      const rootElement = document.getElementById('root');
      
      // Hide loading and show app
      function showApp() {
        if (loadingElement) {
          loadingElement.style.opacity = '0';
          loadingElement.style.transition = 'opacity 0.5s ease';
          setTimeout(() => {
            loadingElement.remove();
            rootElement.classList.add('loaded');
          }, 500);
        }
      }
      
      // Show app when loaded
      window.addEventListener('load', () => {
        // Minimum loading time for smooth UX
        setTimeout(showApp, 800);
      });
      
      // Fallback for errors
      window.addEventListener('error', (e) => {
        console.error('App error:', e.error);
        setTimeout(showApp, 1000);
      });
    </script>
    <script src="/assets/main.js"></script>
  </body>
</html>`;

  fs.writeFileSync('dist/index.html', htmlTemplate);
  fs.writeFileSync('dist/404.html', htmlTemplate);

  console.log('✅ Vercel-optimized build completed successfully!');
  console.log('📁 Output: dist/');
  console.log('🚀 Ready for Vercel deployment!');
  
  // Create deployment info
  const deployInfo = {
    buildTime: new Date().toISOString(),
    environment: isProduction ? 'production' : 'development',
    features: [
      'React 18 with TypeScript',
      'Advanced routing system',
      'Drag & drop functionality', 
      'Real-time analytics',
      'Professional UI components',
      'Mobile responsive design'
    ]
  };
  
  fs.writeFileSync('dist/deploy-info.json', JSON.stringify(deployInfo, null, 2));

} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
