import express from 'express'
import { purchaseTicket, getAllPurchasedTickets, getPurchasedTicket } from '../controllers/attendantsController.js'
import { authenticatedUser } from '../middleware/authentication.js'

const router = express.Router()

router.post('/purchase', authenticatedUser,purchaseTicket)

router.route('/purchased-tickets').get(authenticatedUser, getAllPurchasedTickets)

router.route('/purchased-tickets/:id').get(authenticatedUser, getPurchasedTicket)

export default router