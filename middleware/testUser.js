const BadRequestError  = require('../errors/bad-request');

const testUser = (req, res) => {
    if(req.user.testUser){
        throw new BadRequestError('Test User, Read Only Permissions')
    }
    next()
}


module.exports = testUser

