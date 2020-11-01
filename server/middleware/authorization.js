const { Todo } = require('../models')

const authorization = async (req, res, next) => {

  const id = +req.params.id

  try {
     const todo = await Todo.findByPk(id)
     if(!todo){
       throw { name: 'DataNotFound', msg: 'data not found', status: 404}
     }
     else if(todo.UserId === req.loggedInUser.id){
       return next()
     }
     else {
       throw {name: 'AuthorizationFailed',msg: 'Not Authorized',status: 401}
     }
  } catch (err) {
     return next(err)
  }
}

module.exports = authorization