const { Todo } = require('../models')

const authorization = async (req, res, next) => {

  const id = +req.params.id

  try {
     const todo = await Todo.findByPk(id)
     if(!todo){
       throw { msg: 'Todo Not Foubd', status: 404}
     }
     else if(todo.UserId === req.loggedInUser.id){
       next()
     }
     else {
       throw {msg: 'Not Authorized',status: 401}
     }
  } catch (err) {
      const status = err.status || 500
      const msg = err.msg || 'Internal Server Error'
      res.status(status).send({error : msg})
  }
}

module.exports = authorization