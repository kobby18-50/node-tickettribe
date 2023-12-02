import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes'
import createTokenUser from "../utils/createTokenUser.js"
import NotFoundError from '../errors/not-found.js'
import BadRequestError from "../errors/bad-request.js"
import UnAuthenticatedError from "../errors/unauthenticated.js"


const getAllUsers = async (req,res) => {
    const users = await User.find({role : 'user'}).select('-password')
    res.status(StatusCodes.OK).json({users, count : users.length})
}


const getSingleUser = async (req,res) => {
    const {id : userId} = req.params

    const user = await User.findOne({_id : userId, role : 'user'}).select('-password')
    

    if(!user){
        throw new NotFoundError('No user found')
    }

    res.status(StatusCodes.OK).json({user})


    
}


const updateUser = async (req,res) => {

    const { userId } = req.user

    const { fullName } = req.body

    if(!fullName){
        throw new BadRequestError('Some values were not provided')
    }

    const user = await User.findOne({_id : userId})

    if(!user){
        throw new NotFoundError('No user found')
    }

   
    user.full_name = fullName

    await user.save()

    const tokenUser = createTokenUser(user)

    const token = await user.createJWT()

    res.status(StatusCodes.ACCEPTED).json({msg : 'User updated', user : tokenUser, token})
}





const updateUserPassword = async (req,res) => {

   const { oldpassword, newpassword } = req.body

   if(!oldpassword || !newpassword){
    throw new BadRequestError('Some values were not provided')
   }

   const user = await User.findOne({_id : req.user.userId})


   const isPasswordMatch = await user.comparePasswords(oldpassword)

   if(!isPasswordMatch){
    throw new UnAuthenticatedError('Password mismatch')
   }


   user.password = newpassword

   await user.save()

   res.status(StatusCodes.ACCEPTED).json({msg : 'User updated'})
}

const userProfile = async (req,res) => {
    const { userId } = req.user
    const user = await User.findOne({_id : userId})


    res.status(StatusCodes.OK).json({user : {
        name : user.full_name,
        email : user.email,
        role : user.role
    } })
   
}



export {
    getAllUsers, getSingleUser, updateUser, updateUserPassword, userProfile
}