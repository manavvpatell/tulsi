import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Serve static assets from dist
if (fs.existsSync(distPath)) {
  app.use(
    express.static(distPath, {
      maxAge: '1d',
      setHeaders: (res, filePath) => {
        // Do not cache index.html so updates are instantly reflected
        if (filePath.endsWith('index.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        }
      },
    })
  );

  // Single Page Application (SPA) fallback to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // If dist is not yet built, inform the operator
  app.get('*', (req, res) => {
    res.status(503).send(
      '<h1>Tulsi Jewellers</h1><p>Building client assets... Please ensure <code>npm run build</code> has executed.</p>'
    );
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✨ Tulsi Jewellers production server running on port ${PORT}`);
});
