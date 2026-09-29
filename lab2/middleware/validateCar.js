export const validateCar = (req, res, next) => {
    const { brand, model, year, price } = req.body;

    if (!brand || typeof brand !== 'string' || brand.trim() === '') {
        return res.status(400).json({
            error: 'Поле "brand" (марка) є обов\'язковим і не може бути порожнім',
        });
    }

    if (!model || typeof model !== 'string' || model.trim() === '') {
        return res.status(400).json({
            error: 'Поле "model" (модель) є обов\'язковим і не може бути порожнім',
        });
    }

    if (year === undefined || year === null || typeof year !== 'number') {
        return res.status(400).json({
            error: 'Поле "year" (рік випуску) є обов\'язковим і має бути числом',
        });
    }
    if (year < 1990 || year > 2026) {
        return res.status(400).json({
            error: 'Рік випуску має бути в межах від 1990 до 2026',
        });
    }

    if (price === undefined || price === null || typeof price !== 'number') {
        return res.status(400).json({
            error: 'Поле "price" (ціна) є обов\'язковим і має бути числом',
        });
    }
    if (price < 0) {
        return res.status(400).json({
            error: 'Ціна не може бути від\'ємною',
        });
    }

    next();
};