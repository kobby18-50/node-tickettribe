import BadRequestError from "../errors/bad-request.js"


const checkValidDate = ({startDate, endDate}) => {
    if (endDate < startDate ){
        throw new BadRequestError('Check values for start date and end date')
    }

    console.log(startDate, endDate)
}

export default checkValidDate