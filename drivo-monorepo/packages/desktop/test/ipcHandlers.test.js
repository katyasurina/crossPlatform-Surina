import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHandlers } from '../ipcHandlers.js';
import { DrivoService, MemoryStorageAdapter } from '@drivo/core';

test('IPC: додавання авто', async () => {
    const service = new DrivoService(new MemoryStorageAdapter());
    const handlers = createHandlers(service);

    const result = await handlers.addCar(null, 'Mazda', 25000, 2024);
    assert.equal(result.ok, true);

    const data = await handlers.load();
    assert.equal(data.cars.length, 1);
});

test('IPC: відхилення некоректних даних', async () => {
    const service = new DrivoService(new MemoryStorageAdapter());
    const handlers = createHandlers(service);

    await assert.rejects(
        () => handlers.addCar(null, 123, 25000, 2024),
        /Некоректні дані/
    );
});

test('IPC: видалення авто', async () => {
    const service = new DrivoService(new MemoryStorageAdapter());
    const handlers = createHandlers(service);

    const addRes = await handlers.addCar(null, 'Kia', 20000, 2023);
    const carId = addRes.car.id;

    await handlers.deleteCar(null, carId);
    const data = await handlers.load();
    assert.equal(data.cars.length, 0);
});