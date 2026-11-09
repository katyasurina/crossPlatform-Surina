export const MAX_BRAND_LENGTH = 50;
export const ERROR_EMPTY_BRAND = 'Марка та модель не можуть бути порожніми.';
export const ERROR_TOO_LONG = `Назва авто не повинна перевищувати ${MAX_BRAND_LENGTH} символів.`;
export const ERROR_INVALID_PRICE = 'Ціна повинна бути додатним числом.';
export const ERROR_INVALID_YEAR = 'Рік повинен бути коректним числом (наприклад, 2024).';

export function validateCarData(brand, price, year) {
    const trimmedBrand = String(brand || '').trim();
    const numPrice = Number(price);
    const numYear = Number(year);

    if (!trimmedBrand) {
        return { isValid: false, error: ERROR_EMPTY_BRAND };
    }
    if (trimmedBrand.length > MAX_BRAND_LENGTH) {
        return { isValid: false, error: ERROR_TOO_LONG };
    }
    if (isNaN(numPrice) || numPrice <= 0) {
        return { isValid: false, error: ERROR_INVALID_PRICE };
    }
    if (isNaN(numYear) || numYear < 1900 || numYear > 2100) {
        return { isValid: false, error: ERROR_INVALID_YEAR };
    }

    return { isValid: true, error: null };
}