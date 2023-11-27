import UnAuthenticatedError from "../errors/unauthenticated.js"


const checkPermissions = (requestUrl, resourceUrl) => {
    console.log(requestUrl, resourceUrl)

    if(requestUrl.role === 'admin') return

    if(requestUrl.userId === resourceUrl.toString()) return

    throw new UnAuthenticatedError('You are not authorized to access this route')
}

export default checkPermissions