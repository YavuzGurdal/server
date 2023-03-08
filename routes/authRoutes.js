import express from 'express';
import { register,login,logout  } from '../controllers/authController.js'

const router = express.Router();

// CREATE A USER
router.post('/register', register) // register auth.js'deki register() fonksiyonu

// LOGIN
router.post('/login', login)

//LOGOUT
router.post('/logout', logout)

// GOGOGLE AUTH
// router.post('/google',)

export default router; 