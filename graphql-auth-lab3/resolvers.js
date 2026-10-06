import bcrypt from 'bcryptjs';
import {
    users,
    cars,
    getNextUserId,
    getNextCarId,
} from './data.js';
import { createToken } from './auth.js';

export const resolvers = {
    Query: {
        users: () => users,

        me: (parent, args, context) => context.user,

        cars: () => cars,

        car: (parent, { id }) => cars.find((c) => c.id === id) || null,
    },

    Mutation: {
        register: async (parent, { name, email, password }) => {
            const existing = users.find((u) => u.email === email);
            if (existing) {
                throw new Error('Користувач з таким email вже існує.');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = {
                id: getNextUserId(),
                name,
                email,
                password: hashedPassword,
            };

            users.push(user);
            const token = createToken(user);

            return {
                token,
                user: { id: user.id, name: user.name, email: user.email },
            };
        },

        login: async (parent, { email, password }) => {
            const user = users.find((u) => u.email === email);
            if (!user) {
                throw new Error('Неправильний email або пароль.');
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Неправильний email або пароль.');
            }

            const token = createToken(user);

            return {
                token,
                user: { id: user.id, name: user.name, email: user.email },
            };
        },

        createCar: (parent, { brand, model, year, price }, context) => {
            if (!context.user) {
                throw new Error('Потрібна авторизація.');
            }

            const car = {
                id: getNextCarId(),
                brand,
                model,
                year,
                price,
                owner: context.user,
            };

            cars.push(car);
            return car;
        },

        deleteCar: (parent, { id }, context) => {
            if (!context.user) {
                throw new Error('Потрібна авторизація.');
            }

            const index = cars.findIndex((c) => c.id === id);
            if (index === -1) return false;

            cars.splice(index, 1);
            return true;
        },
    },

    Car: {
        owner: (parent) => parent.owner,
    },
};