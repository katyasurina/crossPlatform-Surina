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

test('IPC: купівля авто через обробник', async () => {
    const service = new DrivoService(new MemoryStorageAdapter());
    const handlers = createHandlers(service);

    const addRes = await handlers.addCar(null, 'Audi', 40000, 2023);
    const carId = addRes.car.id;

    const buyRes = await handlers.buyCar(null, carId, 'Петро');
    assert.equal(buyRes.ok, true);

    const data = await handlers.load();
    assert.equal(data.orders.length, 1);
    assert.equal(data.orders[0].client, 'Петро');
});

test('IPC: зміна статусу замовлення', async () => {
    const service = new DrivoService(new MemoryStorageAdapter());
    const handlers = createHandlers(service);

    const addRes = await handlers.addCar(null, 'Toyota', 30000, 2024);
    const buyRes = await handlers.buyCar(null, addRes.car.id, 'Марія');
    const orderId = buyRes.order.id;

    await handlers.toggleStatus(null, orderId);
    const data = await handlers.load();

    assert.equal(data.orders[0].status, 'В обробці');
});

test('IPC: відхилення некоректного ID при видаленні', async () => {
    const service = new DrivoService(new MemoryStorageAdapter());
    const handlers = createHandlers(service);

    await assert.rejects(
        () => handlers.deleteCar(null, 123), // Передаємо число замість рядка
        /Некоректний ID/
    );
});