const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


class UserController {

  static async register(req, res){
    
    const { email, password } = req.body
   
    
    try {
      //console.log(email);
      
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
      return res.status(500).json(error)
    }

  }
  static async login(req, res){

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
        res.status(401).json({
          "message" : "Invalid email or password"
        })
      }
      else if(!comparePassword(payload.password,user.password)){
        res.status(401).json({
          "message" : "Invalid email or password"
        })
      }
      else {
        
        const token = generateToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({
          "access_token" : token
        })
      }
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

module.exports = UserController