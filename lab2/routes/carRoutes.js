import express from 'express';
import {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
} from '../controllers/carController.js';
import { validateCar } from '../middleware/validateCar.js';

const router = express.Router();

router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', validateCar, createCar);
router.put('/:id', validateCar, updateCar);
router.delete('/:id', deleteCar);

export default router;