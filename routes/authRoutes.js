

import { register, login, verifyEmail, forgotPassword,resetPassword } from '../controllers/authController.js'
import express from 'express'

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.post('/verify-email', verifyEmail)

router.post('/forgot-password', forgotPassword)

router.post('/reset-password', resetPassword)


export default router
