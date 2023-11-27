import mongoose from "mongoose";

const TicketTypeSchema = new mongoose.Schema({
    name : {
        type : String,
        enum : ['regular', 'early-bird', 'packing-pass'],
        required : [true, 'Name is required']
    },

    price : {
        type : Number,
        required : [true, 'Price is required']
    },

    type : {
        type : String,
        enum : ['standard', 'vip', 'vvip'],
        required : [true, 'Type is required']
    },

    ticketQty : {
        type : Number,
        default : 0
    },

    soldQty : {
        type : Number,
        default : 0
    },

    eventId : {
        type : mongoose.Types.ObjectId,
        ref : 'Event',
        required : [true, 'Event is required']
    },

    eventName : {
        type : String,
        required : [true, 'Event Name is required']
    },

    createdBy : {
        type : mongoose.Types.ObjectId,
        required : [true, 'User is required']
    },

    ticketExpiresIn : {
        type : Date,
        required : [true, 'Ticket expiry date is required']
    }
}, { timestamps : true})


TicketTypeSchema.post('save', async function(){
    console.log(this.modifiedPaths())
})


export default mongoose.model('TicketType', TicketTypeSchema)