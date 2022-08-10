import express from 'express';
import { signin, signup } from '../controllers/authController.js'

const router = express.Router();

// CREATE A USER
router.post('/signup', signup) // signup auth.js'deki signup() fonksiyonu

// SIGN IN
router.post('/signin', signin)

// GOGOGLE AUTH
// router.post('/google',)

export default router; 