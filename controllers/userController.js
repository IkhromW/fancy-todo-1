const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


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
}

module.exports = UserController