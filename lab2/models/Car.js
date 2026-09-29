import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: [true, 'Поле "brand" (марка) є обов\'язковим'],
            trim: true,
        },
        model: {
            type: String,
            required: [true, 'Поле "model" (модель) є обов\'язковим'],
            trim: true,
        },
        year: {
            type: Number,
            required: [true, 'Поле "year" (рік випуску) є обов\'язковим'],
            min: [1990, 'Рік не може бути меншим за 1990'],
            max: [2026, 'Рік не може бути більшим за 2026'],
        },
        price: {
            type: Number,
            required: [true, 'Поле "price" (ціна) є обов\'язковим'],
            min: [0, 'Ціна не може бути від\'ємною'],
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const Car = mongoose.model('Car', carSchema);

export default Car;