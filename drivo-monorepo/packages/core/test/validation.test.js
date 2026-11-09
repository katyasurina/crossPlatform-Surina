import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateCarData, MAX_BRAND_LENGTH, ERROR_EMPTY_BRAND, ERROR_TOO_LONG } from '../validation.js';

test('Валідація: коректні дані авто', () => {
    const result = validateCarData('BMW', 50000, 2024);
    assert.equal(result.isValid, true);
});

test('Валідація: порожня марка', () => {
    const result = validateCarData('   ', 50000, 2024);
    assert.equal(result.isValid, false);
    assert.equal(result.error, ERROR_EMPTY_BRAND);
});

test('Валідація: назва авто на межі MAX_BRAND_LENGTH', () => {
    const brand = 'A'.repeat(MAX_BRAND_LENGTH);
    const result = validateCarData(brand, 50000, 2024);
    assert.equal(result.isValid, true);
});

test('Валідація: назва авто надто довга (MAX_BRAND_LENGTH + 1)', () => {
    const brand = 'A'.repeat(MAX_BRAND_LENGTH + 1);
    const result = validateCarData(brand, 50000, 2024);
    assert.equal(result.isValid, false);
    assert.equal(result.error, ERROR_TOO_LONG);
});