import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DrivoService } from '@drivo/core';
import { FileStorageAdapter } from './fileStorageAdapter.js';
import { createHandlers } from './ipcHandlers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        title: 'drivo Desktop',
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
    const filePath = path.join(app.getPath('userData'), 'drivo.json');
    const adapter = new FileStorageAdapter(filePath);
    const service = new DrivoService(adapter);
    const handlers = createHandlers(service);

    ipcMain.handle('drivo:load', handlers.load);
    ipcMain.handle('drivo:addCar', handlers.addCar);
    ipcMain.handle('drivo:deleteCar', handlers.deleteCar);
    ipcMain.handle('drivo:buyCar', handlers.buyCar);
    ipcMain.handle('drivo:toggleStatus', handlers.toggleStatus);

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});