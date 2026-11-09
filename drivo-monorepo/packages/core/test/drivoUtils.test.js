import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCar, formatDate, sortCarsByYear, filterCarsByQuery } from '../drivoUtils.js';

test('Утиліти: створення авто', () => {
    const car = createCar('Tesla', 40000, 2023);
    assert.equal(car.brand, 'Tesla');
    assert.ok(car.createdAt);
});

test('Утиліти: форматування дати', () => {
    assert.equal(formatDate('2024-05-15T10:00:00Z'), '15.05.2024');
});

test('Утиліти: некоректна дата повертає порожній рядок', () => {
    assert.equal(formatDate('not-a-date'), '');
});

test('Утиліти: сортування (спочатку новіші, вихідний масив не змінюється)', () => {
    const cars = [{ brand: 'A', year: 2020 }, { brand: 'B', year: 2024 }];
    const sorted = sortCarsByYear(cars);
    assert.equal(sorted[0].year, 2024);
    assert.equal(cars[0].year, 2020);
});

test('Утиліти: пошук без урахування регістру', () => {
    const cars = [{ brand: 'BMW' }, { brand: 'Audi' }];
    const result = filterCarsByQuery(cars, 'bmw');
    assert.equal(result.length, 1);
    assert.equal(result[0].brand, 'BMW');
});