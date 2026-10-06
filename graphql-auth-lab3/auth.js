import jwt from 'jsonwebtoken';
import { users } from './data.js';

export const JWT_SECRET = 'auto-salon-secret-key-lab3';

export function createToken(user) {
    return jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
}

export function getUserFromToken(token) {
    if (!token) return null;
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        return users.find((u) => u.id === payload.id) || null;
    } catch (err) {
        return null;
    }
}

export function getUserFromAuthHeader(authHeader) {
    if (!authHeader) return null;
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) return null;
    return getUserFromToken(token);
}