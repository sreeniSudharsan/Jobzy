const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  
  res.status(StatusCodes.CREATED)
      .json({ user: 
      { name: user.name, 
      email:user.email, 
      lastName: user.lastName, 
      location:user.location, token}}
      )
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT();

  res.status(StatusCodes.OK)
    .json({ user: 
      { name: user.name, 
      email:user.email, 
      lastName: user.lastName, 
      location:user.location, token }})
  };

const updateUser = async(req, res)=> {
   const {email, name, lastName, location} = req.body
   console.log(req.user)
   if(!email || !name || !lastName || !location){
    throw new BadRequestError('Please provide all the field values');
   }
   const user = await User.findOne({_id: req.user.userId})

   user.email = email;
   user.name = name;
   user.lastName = lastName;
   user.location = location; 

   await user.save();
   const token = user.createJWT(); //Name value can be different because we're updating the value, thus we change the token
   res.status(StatusCodes.OK)
    .json({ user: 
      { name: user.name, 
      email:user.email, 
      lastName: user.lastName, 
      location:user.location, token }})
};


module.exports = {
  register,
  login,
  updateUser
}
 