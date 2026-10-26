const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function getDataFilePath() {
    return path.join(app.getPath('userData'), 'drivo.json');
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        title: 'drivo Desktop',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

ipcMain.handle('drivo:load', () => {
    console.log("Шлях до файлу:", getDataFilePath());
    const filePath = getDataFilePath();

    const defaultData = {
        cars: [
            { id: '1', brand: 'BMW M4 Competition', price: 78900, year: 2024 },
            { id: '2', brand: 'Audi Q5 Sportback', price: 54500, year: 2023 },
            { id: '3', brand: 'Tesla Model 3', price: 42300, year: 2024 },
            { id: '4', brand: 'Porsche Taycan', price: 96000, year: 2023 },
            { id: '5', brand: 'Mercedes GLC 300', price: 58700, year: 2022 },
            { id: '6', brand: 'Toyota Camry', price: 36800, year: 2024 },
            { id: '7', brand: 'Lexus RX 350', price: 63200, year: 2023 },
            { id: '8', brand: 'Volkswagen Tiguan', price: 31200, year: 2024 },
            { id: '9', brand: 'Ford Mustang GT', price: 47800, year: 2023 },
            { id: '10', brand: 'Kia Sportage', price: 28900, year: 2024 }
        ],
        orders: []
    };

    if (!fs.existsSync(filePath)) {
        return defaultData;
    }

    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const parsedData = JSON.parse(data);

        if (!parsedData.cars || parsedData.cars.length === 0) {
            parsedData.cars = defaultData.cars;
        }

        return parsedData;
    } catch (error) {
        console.error("Помилка читання:", error);
        return defaultData;
    }
});

ipcMain.handle('drivo:save', (event, data) => {
    const filePath = getDataFilePath();
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error("Помилка запису:", error);
        return false;
    }
});

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});