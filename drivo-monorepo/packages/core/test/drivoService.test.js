import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DrivoService } from '../drivoService.js';
import { MemoryStorageAdapter } from '../storageAdapter.js';

test('Сервіс: додавання авто', async () => {
    const service = new DrivoService(new MemoryStorageAdapter());
    const result = await service.addCar('Ford', 30000, 2024);
    assert.equal(result.ok, true);
});

test('Сервіс: відхилення порожнього тексту', async () => {
    const service = new DrivoService(new MemoryStorageAdapter());
    const result = await service.addCar('', 30000, 2024);
    assert.equal(result.ok, false);
});

test('Сервіс: купівля авто та створення замовлення', async () => {
    const service = new DrivoService(new MemoryStorageAdapter());
    const addResult = await service.addCar('Kia', 20000, 2023);
    const buyResult = await service.buyCar(addResult.car.id, 'Іван');

    assert.equal(buyResult.ok, true);
    const data = await service.getData();
    assert.equal(data.cars.length, 0);
    assert.equal(data.orders.length, 1);
});

test('Сервіс: унікальність id', async () => {
    const service = new DrivoService(new MemoryStorageAdapter());
    const res1 = await service.addCar('Car 1', 1000, 2020);
    const res2 = await service.addCar('Car 2', 2000, 2021);
    assert.notEqual(res1.car.id, res2.car.id);
});