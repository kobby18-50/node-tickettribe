import { getSingleUser, getAllUsers, updateUser, updateUserPassword, showMe} from '../controllers/userController.js'
import { authenticatedUser, authorizePermissions } from '../middleware/authentication.js'

import express from 'express'

const router = express.Router()

router.get('/', [authenticatedUser, authorizePermissions
('admin')], getAllUsers)

router.get('/showMe', authenticatedUser, showMe )

router.patch('/updateUserPassword', [authenticatedUser], updateUserPassword)

router.patch('/updateUser', [authenticatedUser], updateUser)

router.get('/:id', [authenticatedUser, authorizePermissions('admin')], getSingleUser)

export default router