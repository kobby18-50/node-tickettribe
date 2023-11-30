import { StatusCodes } from "http-status-codes"
import BadRequestError from "../errors/bad-request.js"
import NotFoundError from "../errors/not-found.js"
import Attendants from "../models/Attendants.js"
import TicketType from "../models/TicketType.js"



const purchaseTicket = async (req,res) => {
    const { name, userId } = req.user
    const { eventName, ticketType, ticketName, ticketQty } = req.body

    if(!eventName || !ticketType || !ticketName || !ticketQty){
        throw new BadRequestError('Some values were not provided')
    }

   
    const ticket = await TicketType.findOne({eventName , type: ticketType, name : ticketName })
    
    if(!ticket){
        throw new NotFoundError('Ticket might not exist')
    }

    // checking qty
    if(ticketQty > ticket.ticketQty ){
        throw new BadRequestError('Ticket quantity is not enough for your desired quantity')
    }

    // untested 2
    // ticket qty is 0
    if(ticket.ticketQty === 0){
        throw new BadRequestError('Ticket is sold out')
    }

    // if attendantTicket already exists
    const attendantExits = await Attendants.findOne({attendantId : req.user.userId, eventName , ticketType , ticketName })

    if(attendantExits){
        throw new BadRequestError('Ticket has already been created')
    }


     // ticket qty 
    ticket.ticketQty = ticket.ticketQty - ticketQty

    // attendant name 
    req.body.attendantName = name

    // attendant id
    req.body.attendantId = userId

    // event Id
    req.body.eventId = ticket.eventId

    // ticket type id
    req.body.ticketTypeId = ticket._id

    // price
    req.body.price = ticket.price * ticketQty
    

    // payment

    const purchaseTicket = await Attendants.create(req.body)


    // sendEmail
    // const user = await User.findOne({_id : req.user.userId})

    res.status(StatusCodes.CREATED).json({ticket : purchaseTicket})

}

const getAllPurchasedTickets = async (req,res) => {
    const purchaseTickets = await Attendants.find({attendantId : req.user.userId})

    
    

   


    res.status(StatusCodes.OK).json({purchaseTickets, count: purchaseTickets.length})
}

const getPurchasedTicket = async (req,res) => {
    const { id : purchaseTicketId } = req.params

    const purchaseTicket = await Attendants.findOne({attendantId : req.user.userId, _id : purchaseTicketId})

    if(!purchaseTicket){
        throw new NotFoundError('Purchased ticket not found')
    }


    res.status(StatusCodes.OK).json({purchaseTicket})
}

export { purchaseTicket, getAllPurchasedTickets, getPurchasedTicket }