import mongoose from "mongoose";

const AttendantsSchema = new mongoose.Schema({
    attendantName : {
        type : String,
        required : [true, 'Name is required'],
        trim : true        
    },

    attendantId : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true, 'Attendant Id is required']
    },

    eventId : {
        type : mongoose.Types.ObjectId,
        ref : 'Event',
        required : true
    },

    eventName : {
       type : String,
       required : true
    },

    ticketType : {
        type : String,
        required : [true, 'Ticket type is required']
    },

    ticketName : {
        type : String,
        required : [true, 'Ticket type is required']
    },

    ticketTypeId : {
        type : mongoose.Types.ObjectId,
        required : true
    },

    ticketQty : {
        type : Number,
        required : [true, 'Ticket qunatity is required']
    },

    price : {
        type : Number,
        required : true
    }


}, {timestamps : true })

AttendantsSchema.post('save', async function(next){

    const ticket = await this.model('TicketType').findOne({name : this.ticketName, type : this.ticketType, eventName : this.eventName})

    ticket.ticketQty = ticket.ticketQty - this.ticketQty
    ticket.soldQty = ticket.soldQty + this.ticketQty

    await ticket.save()

})

export default mongoose.model('Attendant', AttendantsSchema)