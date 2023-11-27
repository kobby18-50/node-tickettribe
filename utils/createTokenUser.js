
const createTokenUser = (user) => {
    return {
        userId : user._id,
        name : user.full_name,
        role : user.role
    }
}

export default createTokenUser