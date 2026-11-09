import fs from 'node:fs';
import path from 'node:path';
import { DrivoStorageAdapter } from '@drivo/core';

export class FileStorageAdapter extends DrivoStorageAdapter {
    constructor(filePath) {
        super();
        this.filePath = filePath;
        this.defaultData = {
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
    }

    async load() {
        try {
            if (!fs.existsSync(this.filePath)) {
                return this.defaultData;
            }
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error("Помилка читання файлу:", error);
            return this.defaultData;
        }
    }

    async save(data) {
        try {
            const dir = path.dirname(this.filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            console.error("Помилка запису у файл:", error);
        }
    }
}