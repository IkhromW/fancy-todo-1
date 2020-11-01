const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');


class UserController {

  static async register(req, res, next){
    
    const { email, password } = req.body
   
    
    try {
      
      const obj = {
        email,
        password
      }
     
      const user = await User.create(obj)
      return res.status(201).json({
        id: user.id,
        email: user.email
      })

    } catch (error) {
      return next(error)
    }

  }
  static async login(req, res, next){

    try {
      const { email, password } = req.body
      const payload = {
        email,
        password
      }
      const user = await User.findOne({
        where : {
          email: payload.email
        }
      })
      
      if(!user){
        throw {name: 'LoginFailed', msg: "Invalid email or password", status: 401 }
      }
      else if(!comparePassword(payload.password,user.password)){
        throw {name: 'LoginFailed', msg: "Invalid email or password", status: 401 }
      }
      else {
        
        const token = generateToken({
          id: user.id,
          email: user.email
        })
        return res.status(200).json({
          "access_token" : token
        })
      }
    } catch (error) {
      return next(error)
    }
  }
  static googleLogin(req, res, next) {

    let { google_access_token }= req.body
    console.log(google_access_token);
    
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let email
    client.verifyIdToken({
      idToken: google_access_token,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      email = payload.email
      console.log(email);
      
      return User.findOne({
        where:{
          email : payload.email
        }
      })
    })
    .then(user => {

      if(user){
        return user
      }
      else{
        console.log('<<<');
        
       return User.create({
          email,
          password: 'randomAja'
        })
      }
    })
    .then(dataUser => {
      let access_token = generateToken({ 
        id: user.id,
        email: user.email
      })
      res.status(200).json({access_token})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController