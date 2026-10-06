export const users = [];
export const cars = [];

let userIdCounter = 1;
let carIdCounter = 1;

export function getNextUserId() {
    return String(userIdCounter++);
}

export function getNextCarId() {
    return String(carIdCounter++);
}