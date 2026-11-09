import { DrivoStorageAdapter } from '@drivo/core';

export class LocalStorageAdapter extends DrivoStorageAdapter {
    constructor(storage = localStorage) {
        super();
        this.storage = storage;
        this.key = 'drivo-data';
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
            const data = this.storage.getItem(this.key);
            if (!data) {
                return this.defaultData;
            }
            return JSON.parse(data);
        } catch (e) {
            console.error('Помилка читання localStorage', e);
            return this.defaultData;
        }
    }

    async save(data) {
        try {
            this.storage.setItem(this.key, JSON.stringify(data));
        } catch (e) {
            console.error('Помилка запису в localStorage', e);
        }
    }
}