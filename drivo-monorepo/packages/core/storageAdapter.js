
export class DrivoStorageAdapter {
    async load() {
        throw new Error('Метод load() не реалізовано у цьому адаптері');
    }
    async save(data) {
        throw new Error('Метод save() не реалізовано у цьому адаптері');
    }
}

export class MemoryStorageAdapter extends DrivoStorageAdapter {
    constructor(initialData = { cars: [], orders: [] }) {
        super();
        this.data = JSON.parse(JSON.stringify(initialData));
    }
    async load() {
        return JSON.parse(JSON.stringify(this.data));
    }
    async save(data) {
        this.data = JSON.parse(JSON.stringify(data));
    }
}