import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import { 
  getAllConsultants, 
  getConsultantById, 
  updateConsultantProfile 
} from '../controllers/consultantController.js';

const router = express.Router();

router.get('/', getAllConsultants);
router.get('/:id', getConsultantById);
router.put('/profile', protect, updateConsultantProfile);

export default router;