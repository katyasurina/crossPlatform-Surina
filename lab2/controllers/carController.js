import Car from '../models/Car.js';

/**
 * Отримати список усіх авто (відсортованих за датою створення).
 * GET /api/cars
 */
export const getCars = async (req, res) => {
    try {
        const cars = await Car.find().sort({ createdAt: -1 });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Помилка сервера при отриманні авто' });
    }
};

/**
 * Отримати одне авто за id.
 * GET /api/cars/:id
 */
export const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ error: 'Авто не знайдено' });
        }
        res.status(200).json(car);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Некоректний формат id' });
        }
        res.status(500).json({ error: 'Помилка сервера при отриманні авто' });
    }
};

/**
 * Створити нове авто.
 * POST /api/cars
 */
export const createCar = async (req, res) => {
    try {
        const { brand, model, year, price, description } = req.body;
        const newCar = await Car.create({ brand, model, year, price, description });
        res.status(201).json(newCar);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Помилка сервера при створенні авто' });
    }
};

/**
 * Оновити існуюче авто за id.
 * PUT /api/cars/:id
 */
export const updateCar = async (req, res) => {
    try {
        const { brand, model, year, price, description } = req.body;
        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            { brand, model, year, price, description },
            { new: true, runValidators: true }
        );
        if (!updatedCar) {
            return res.status(404).json({ error: 'Авто не знайдено' });
        }
        res.status(200).json(updatedCar);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Некоректний формат id' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Помилка сервера при оновленні авто' });
    }
};

/**
 * Видалити авто за id.
 * DELETE /api/cars/:id
 */
export const deleteCar = async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) {
            return res.status(404).json({ error: 'Авто не знайдено' });
        }
        res.status(200).json({
            message: 'Авто успішно видалено',
            car: deletedCar,
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Некоректний формат id' });
        }
        res.status(500).json({ error: 'Помилка сервера при видаленні авто' });
    }
};