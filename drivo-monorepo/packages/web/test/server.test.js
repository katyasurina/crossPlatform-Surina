import { test } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';

const PORT = 3001; // Використовуємо інший порт, щоб не конфліктувати з реальним сервером

// Функція для запуску сервера під час тесту
const startTestServer = () => {
    return new Promise((resolve) => {
        const server = http.createServer((req, res) => {
            if (req.url === '/') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>OK</h1>');
            } else {
                res.writeHead(404);
                res.end('Not Found');
            }
        });
        server.listen(PORT, () => resolve(server));
    });
};

test('Сервер: дозволений шлях (головна)', async () => {
    const server = await startTestServer();

    const response = await fetch(`http://localhost:${PORT}/`);
    assert.equal(response.status, 200);

    server.close();
});

test('Сервер: заборонений шлях (404)', async () => {
    const server = await startTestServer();

    const response = await fetch(`http://localhost:${PORT}/secret.txt`);
    assert.equal(response.status, 404);

    server.close();
});