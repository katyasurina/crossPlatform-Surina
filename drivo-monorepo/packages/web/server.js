import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const ALLOWED_FILES = ['index.html', 'script.js', 'style.css', 'localStorageAdapter.js'];

const server = http.createServer((req, res) => {
    const url = req.url === '/' ? '/index.html' : req.url;

    if (url.startsWith('/node_modules/@drivo/core/')) {
        const coreFile = url.replace('/node_modules/@drivo/core/', '');
        const filePath = path.join(__dirname, '../core', coreFile);
        if (fs.existsSync(filePath)) {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(fs.readFileSync(filePath));
            return;
        }
    }

    const fileName = url.substring(1);
    if (ALLOWED_FILES.includes(fileName)) {
        const filePath = path.join(__dirname, fileName);
        if (fs.existsSync(filePath)) {
            let contentType = 'text/plain';
            if (fileName.endsWith('.html')) contentType = 'text/html';
            if (fileName.endsWith('.js')) contentType = 'application/javascript';
            if (fileName.endsWith('.css')) contentType = 'text/css';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(fs.readFileSync(filePath));
            return;
        }
    }

    res.writeHead(404);
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`Веб-сервер запущено: http://localhost:${PORT}`);
});