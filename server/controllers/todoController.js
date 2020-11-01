const { Todo, User } = require('../models')

class TodoController {

  static async addNewTodo(req, res, next){

    const { title, description, due_date } = req.body
    const UserId = req.loggedInUser.id
    
    const obj = {
      title,
      description,
      due_date,
      UserId
    }
    
    
    try {

      const todo = await Todo.create(obj) 
      res.status(201).json(todo)
    } catch (error) {
      next(error)
    } 
  }

  static async showAllTodo(req, res, next){
  
    try {
      const data = await Todo.findAll({
        include: [{model: User, attributes: ['email']}],
        order: [['due_date','ASC']]
      })
     
      let todos = data.map(el => {
        
        let obj ={
          id: el.id,
          UserId: el.UserId,
          title: el.title,
          description: el.description,
          due_date: el.formatDate(),
          status: el.status,
          email: el.User.email
        }
        return obj
      })
      
      
       return res.status(200).json({ todos })
    } catch (error) {
       return next(error)
    }
  }

  static async showTodoById(req, res, next){
   
    const id =  +req.params.id
    const email = req.loggedInUser.email
    try {
    
     const todo = await Todo.findByPk(id)
     if(!todo){
       throw { name: 'DataNotFound', msg: 'data not found', status: 404}
     }else {
      const obj = {
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        due_date: todo.formatDate(), 
        email: email
      }
      return res.status(200).json({todo : obj})
     }
     
   } catch (error) {
      return next(error)
   }

  }

  static async updateTodo(req, res, next){

    try {
      const id = +req.params.id
      const {title, description, status, due_date} = req.body
      const obj = {
        title,
        description,
        status,
        due_date
      }

      const todo = await Todo.update(obj,{
        where: {
          id : id
        },
        returning: true
      })
      if(todo[0] === 0){
        throw { name: 'DataNotFound', msg: 'data not found', status: 404}
      } else {
        return res.status(200).json(todo[1][0])
      }
    } catch (error) {

        return next(error)
    }
  }

  static async updateStatus(req, res, next){

    try {
      const id = +req.params.id
      const { status } = req.body
      let obj = {
        status
      }
      const todo = await Todo.update(obj,{
        where: {
          id: id
        },
        returning : true
      })
      if(todo[0] === 0){
        throw { name: 'DataNotFound', msg: 'data not found', status: 404}
      }
      else if(!status || status === ''){
        throw { name: 'StatusError', msg: 'status not updated yet', status: 400}
      }
      else {
         return res.status(200).json(todo[1][0])
      }
    } catch (error) {

       return next(error)
    }
  }
  static async deleteById(req, res, next){
    try {
      const id = +req.params.id
      const deleteTodo = await Todo.destroy({
        where: {
          id: id
        }
      })
      if(!deleteTodo){
        throw { name: 'DataNotFound', msg: 'data not found', status: 404}
      } else {
       return res.status(200).json({
          "message" : "data succesfully delete"
        })
      }
      
    } catch (error) {
      return next(error)
    } 
  }
}
module.exports = TodoController