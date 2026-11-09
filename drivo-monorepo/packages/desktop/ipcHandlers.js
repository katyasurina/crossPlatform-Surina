export function createHandlers(service) {
    return {
        async load() {
            return await service.getData();
        },
        async addCar(event, brand, price, year) {
            if (typeof brand !== 'string') throw new Error('Некоректні дані');
            return await service.addCar(brand, price, year);
        },
        async deleteCar(event, id) {
            if (typeof id !== 'string') throw new Error('Некоректний ID');
            return await service.deleteCar(id);
        },
        async buyCar(event, carId, clientName) {
            if (typeof clientName !== 'string') throw new Error('Некоректне ім\'я');
            return await service.buyCar(carId, clientName);
        },
        async toggleStatus(event, orderId) {
            return await service.toggleStatus(orderId);
        }
    };
}