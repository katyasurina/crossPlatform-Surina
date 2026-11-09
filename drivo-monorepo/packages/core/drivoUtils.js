export function createCar(brand, price, year) {
    return {
        id: Date.now().toString() + Math.floor(Math.random() * 1000).toString(),
        brand: brand.trim(),
        price: Number(price),
        year: Number(year),
        createdAt: new Date().toISOString()
    };
}
export function createOrder(car, clientName) {
    return {
        id: Date.now().toString() + Math.floor(Math.random() * 1000).toString(),
        carBrand: car.brand,
        price: car.price,
        client: clientName.trim(),
        status: 'Нове'
    };
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return '';
    }
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}.${m}.${y}`;
}

export function sortCarsByYear(cars) {
    return [...cars].sort((a, b) => b.year - a.year);
}

export function filterCarsByQuery(cars, query) {
    if (!query) {
        return cars;
    }
    return cars.filter(car => car.brand.toLowerCase().includes(query.toLowerCase()));
}