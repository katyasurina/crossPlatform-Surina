import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './services/db.js';
import carRoutes from './routes/carRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Глобальні middleware
app.use(cors());
app.use(express.json()); // <-- ОБОВ'ЯЗКОВО для POST/PUT

// 2. Middleware для логування
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// 3. Тестовий маршрут
app.get('/', (req, res) => {
    res.send('Сервер автосалону працює! 🚗');
});

// 4. Маршрути для авто (має бути ПІСЛЯ express.json())
app.use('/api/cars', carRoutes);

console.log('carRoutes:', typeof carRoutes);

// 5. Підключення до БД та запуск сервера
connectDB(process.env.MONGO_URI);

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущено на порті ${PORT}`);
});