import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import { 
  createAppointment, 
  getUserAppointments 
} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', protect, createAppointment);
router.get('/user', protect, getUserAppointments);

export default router;