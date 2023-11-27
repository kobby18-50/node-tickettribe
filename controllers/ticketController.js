import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/bad-request.js"
import TicketType from "../models/TicketType.js"
import Event from "../models/Event.js"
import NotFoundError from '../errors/not-found.js'

const createTicket = async (req,res) => {
    const { price, eventName, name, type } = req.body

    if(!price || !eventName || !name || !type) {
        throw new BadRequestError('Some values were not provided')
    }

    const checkEvent = await Event.findOne({title : eventName, createdBy : req.user.userId})
    
    // if ticket already exists by name
    const ticketAlreadyExists = await TicketType.findOne({ name , type, createdBy : req.user.userId, eventName})

    if(ticketAlreadyExists){
        throw new BadRequestError('Ticket has already being created')
    }

    if(!checkEvent){
        throw new BadRequestError('No event with name ' + eventName + ' present')
    }

    // tieing the event id to the ticket
     req.body.eventId = checkEvent._id 

    //  tieing the ticket expiry date 
      let ticketExpiresIn = checkEvent.endDate
      ticketExpiresIn = ticketExpiresIn.setDate(ticketExpiresIn.getDate() + 1)

      req.body.ticketExpiresIn = ticketExpiresIn


    //   tieing the user
    req.body.createdBy = req.user.userId


    const ticket = await TicketType.create(req.body)

    res.status(StatusCodes.CREATED).json({ticket})

}

const getAllMyTickets = async (req,res) => {

    const tickets = await TicketType.find({createdBy : req.user.userId}).sort('-updatedAt')

    res.status(StatusCodes.OK).json({tickets, count : tickets.length})
}

const getAllTickets = async (req,res) => {
    const tickets = await TicketType.find({})

    res.status(StatusCodes.OK).json({tickets, count : tickets.length})
}

const getTicket = async (req,res) => {
    const { id : ticketId } = req.params

    const ticket = await TicketType.findOne({_id : ticketId, createdBy : req.user.userId})

    if(!ticket){
        throw new NotFoundError('No ticket found')
    }
    res.status(StatusCodes.OK).json({ticket})
}



const updateTicket = async (req,res) => {
    const { id : ticketId } = req.params

    const ticketExists = await TicketType.findOne({_id : ticketId, createdBy : req.user.userId})

    if(!ticketExists){
        throw new NotFoundError('No ticket found')
    }

    const ticket = await TicketType.findOneAndUpdate({_id : ticketId, createdBy : req.user.userId}, req.body, { runValidators : true, new : true})

    res.status(StatusCodes.ACCEPTED).json({ticket})
}

const deleteTicket = async (req,res) => {
    const { id : ticketId } = req.params

    const ticketExists = await TicketType.findOne({_id : ticketId, createdBy : req.user.userId})

    if(!ticketExists){
        throw new NotFoundError('No ticket found')
    }

    await TicketType.findOneAndDelete({_id : ticketId, createdBy : req.user.userId})

    res.status(StatusCodes.OK).json({msg : 'Ticket deleted'})
}

export { getAllMyTickets, getTicket, getAllTickets, createTicket, updateTicket, deleteTicket}
