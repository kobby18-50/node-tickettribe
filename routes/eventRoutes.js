
import { getAllEvents, getAllMyEvents, getEvent, createEvent, deleteEvent, updateEvent} from '../controllers/eventController.js'
import { authenticatedUser} from '../middleware/authentication.js'

import express from 'express'

const router = express.Router()

router.route('/').get(getAllEvents).post(authenticatedUser, createEvent)

router.get('/my-events', authenticatedUser,  getAllMyEvents)

router.route('/:id').get(getEvent).patch(authenticatedUser, updateEvent).delete([authenticatedUser], deleteEvent)

export default router