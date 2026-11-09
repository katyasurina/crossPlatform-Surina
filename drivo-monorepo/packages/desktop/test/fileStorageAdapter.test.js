import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { FileStorageAdapter } from '../fileStorageAdapter.js';

test('Файловий адаптер: файлу немає — повертає дефолтні дані', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'drivo-test-'));
    const filePath = path.join(tempDir, 'test.json');
    const adapter = new FileStorageAdapter(filePath);

    const data = await adapter.load();
    assert.equal(data.cars.length, 10);

    fs.rmSync(tempDir, { recursive: true, force: true });
});

test('Файловий адаптер: запис та наступне читання', async () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'drivo-test-'));
    const filePath = path.join(tempDir, 'test.json');
    const adapter = new FileStorageAdapter(filePath);

    const testData = { cars: [{ id: '1', brand: 'Audi' }], orders: [] };
    await adapter.save(testData);

    const loaded = await adapter.load();
    assert.equal(loaded.cars.length, 1);
    assert.equal(loaded.cars[0].brand, 'Audi');

    fs.rmSync(tempDir, { recursive: true, force: true });
});