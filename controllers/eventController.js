import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/bad-request.js"
import Event from "../models/Event.js"
import NotFoundError from "../errors/not-found.js"
import checkValidDate from "../utils/checkValidDate.js"

const getAllEvents = async (req,res) => {
    const events = await Event.find({}).sort('-updatedAt')
    res.status(StatusCodes.OK).json({events, count : events.length})
}

const getEvent = async (req,res) => {
    const { id : eventId } = req.params

    const event = await Event.findOne({_id : eventId})

    if(!event){
        throw new NotFoundError('No event found matching the id provided')
    }

    res.status(StatusCodes.OK).json({event})
}

const getAllMyEvents = async (req,res) => {

   const event = await Event.find({createdBy : req.user.userId}).sort('-updatedAt')

   res.status(StatusCodes.OK).json({event, count : event.length})
}

const createEvent = async (req,res) => {
    const { title, description, location, startDate, startDateTime, endDate, endDateTime} = req.body

    if(!title || !description || !location || !startDate || !startDateTime || !endDate || !endDateTime){
        throw new BadRequestError('Some values were not provided')
    }

    const createdBy = req.user.userId

    // check valid date
    checkValidDate( { startDate, endDate } )

     const event = await Event.create({ title, description, location, startDate, startDateTime, endDate, endDateTime, createdBy})


     res.status(StatusCodes.CREATED).json({event})
}

const updateEvent = async (req,res) => {
    const { id : eventId } = req.params
    const { userId } = req.user


    const eventExists = await Event.findOne({_id : eventId, createdBy : userId})

    if(!eventExists){
        throw new NotFoundError('No event(s) found')
    }

    // check valid date
    checkValidDate( { startDate : req.body.startDate, endDate : req.body.endDate } )

    const event = await Event.findOneAndUpdate({_id : eventId, createdBy : userId}, req.body, {new : true, runValidators : true})


    res.status(StatusCodes.OK).json({event})
}

const deleteEvent = async (req,res) => {
    const { id : eventId } = req.params
    const { userId } = req.user

    const event = await Event.findOne({_id : eventId, createdBy : userId})

    if(!event){
        throw new NotFoundError('No event found matching id provided')
    }



    await event.deleteOne()


    res.status(StatusCodes.OK).json({msg : 'Event deleted'})
}

export { getAllEvents, getEvent, getAllMyEvents, createEvent, updateEvent, deleteEvent}