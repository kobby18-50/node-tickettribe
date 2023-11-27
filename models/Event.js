import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    title : {
        type : String,
        minlength : [10, 'Title must be at least 10 characters'],
        required : [true, 'Title is a required field'],
        unique : true,
        trim : 'true'
    },

    description : {
        type : String,
        minlength : [20, 'Minlength for description is 20 characters'],
        required : [true, 'Description is a required field'],
    },

    location : {
        type : String,
        required : [true, 'Location is a required field'],
        minlength : [2, 'Minlength for location is 2 characters']
    },

    startDate: {
        type : Date,
        required : [true, 'Start date is a required field'],
    },

    startDateTime: {
        type : String,
        required : [true, 'Start Date Time is a required field'],
    },

    endDate: {
        type : Date,
        required : [true, 'End date is a required field'],
    },

    endDateTime: {
        type : String,
        required : [true, 'End Date Time is a required field'],
    },

    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true , 'User is required']
    }

}, {timestamps : true})


EventSchema.pre('deleteOne', {document : true, query : false},
 async function(){
    await this.model('TicketType').deleteMany({eventId : this._id})
})

export default mongoose.model('Event', EventSchema)