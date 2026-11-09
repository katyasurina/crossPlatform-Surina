import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LocalStorageAdapter } from '../localStorageAdapter.js';

const createMockStorage = () => {
    const store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value; }
    };
};

test('LocalStorage: порожнє сховище повертає дефолтні дані', async () => {
    const adapter = new LocalStorageAdapter(createMockStorage());
    const data = await adapter.load();
    assert.equal(data.cars.length, 10);
    assert.equal(data.orders.length, 0);
});

test('LocalStorage: запис та наступне читання', async () => {
    const adapter = new LocalStorageAdapter(createMockStorage());
    const testData = { cars: [{ id: '1', brand: 'Test' }], orders: [] };

    await adapter.save(testData);
    const loaded = await adapter.load();

    assert.equal(loaded.cars.length, 1);
    assert.equal(loaded.cars[0].brand, 'Test');
});

test('LocalStorage: пошкоджений JSON не ламає застосунок', async () => {
    const mockStorage = createMockStorage();
    mockStorage.setItem('drivo-data', 'невалідний json');

    const adapter = new LocalStorageAdapter(mockStorage);
    const data = await adapter.load();

    assert.equal(data.cars.length, 10);
});