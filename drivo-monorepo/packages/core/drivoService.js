import { validateCarData } from './validation.js';
import { createCar, createOrder } from './drivoUtils.js';

export class DrivoService {
    constructor(adapter) {
        this.adapter = adapter;
    }

    async getData() {
        return await this.adapter.load();
    }

    async addCar(brand, price, year) {
        const validation = validateCarData(brand, price, year);
        if (!validation.isValid) {
            return { ok: false, error: validation.error };
        }
        const data = await this.adapter.load();
        const newCar = createCar(brand, price, year);
        data.cars.push(newCar);
        await this.adapter.save(data);
        return { ok: true, car: newCar };
    }

    async deleteCar(carId) {
        const data = await this.adapter.load();
        data.cars = data.cars.filter(c => c.id !== carId);
        await this.adapter.save(data);
        return { ok: true };
    }

    async buyCar(carId, clientName) {
        const cleanName = String(clientName || '').trim();
        if (!cleanName) {
            return { ok: false, error: 'Будь ласка, введіть ваше ПІБ!' };
        }
        const data = await this.adapter.load();
        const car = data.cars.find(c => c.id === carId);
        if (!car) {
            return { ok: false, error: 'Автомобіль не знайдено.' };
        }
        const newOrder = createOrder(car, cleanName);
        data.orders.push(newOrder);
        data.cars = data.cars.filter(c => c.id !== carId);
        await this.adapter.save(data);
        return { ok: true, order: newOrder };
    }

    async toggleStatus(orderId) {
        const data = await this.adapter.load();
        data.orders = data.orders.map(o => {
            if (o.id === orderId) {
                const nextStatus =
                    o.status === 'Нове' ? 'В обробці' :
                        o.status === 'В обробці' ? 'Оплачено' :
                            'Завершено';
                return { ...o, status: nextStatus };
            }
            return o;
        });
        await this.adapter.save(data);
        return { ok: true };
    }
}