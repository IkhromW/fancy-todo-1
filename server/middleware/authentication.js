const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const  authentication = async (req,res, next) => {

    const { access_token } = req.headers  
  
    try {
        if(!access_token){
          throw {name: 'AuthenticationFailed' ,msg : `You haven't login yet`, status: 401}
        }
        else{
          const decoded = verifyToken(access_token)
          const user = await User.findOne({
            where : {
              email : decoded.email
            }
          })
          if(!user){
            throw {name: 'AuthenticationFailed' ,msg : `You haven't login yet`, status: 401}
          }
          else{
            req.loggedInUser = decoded
            return next()
          }
        }   
    } catch (err) {
        return next(err)
       
    }
}

module.exports = authentication