import { getAllMyTickets, getTicket, getAllTickets, createTicket, updateTicket, deleteTicket} from '../controllers/ticketController.js'
import express from 'express'
import { authenticatedUser } from '../middleware/authentication.js'

const router = express.Router()

router.route('/').get(authenticatedUser, getAllTickets).post(authenticatedUser, createTicket)

router.get('/my-tickets', authenticatedUser, getAllMyTickets)


router.route('/:id').get(authenticatedUser, getTicket).patch(authenticatedUser, updateTicket).delete(authenticatedUser, deleteTicket)

export default router