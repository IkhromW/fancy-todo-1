const { Todo } = require('../models')

class TodoController {

  static async addNewTodo(req, res){

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
      
      if(error.name === 'SequelizeValidationError'){

        res.status(400).json({
         "message" : "please input properly"
        })
      } else { 
        res.status(500).send(error)
      }
    } 
  }

  static async showAllTodo(req, res){

    try {
      const todos = await Todo.findAll({
        order: [['id']]
      })
       res.status(200).json(todos)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async showTodoById(req, res){
   
    try {
     const id =  +req.params.id
    
     const todo = await Todo.findByPk(id)
     if(!todo){
        res.status(404).json({
          "message" : "data not found"
        })

     }else {

       res.status(200).json(todo)
     }
     
   } catch (error) {
     res.status(500).send(error)
   }

  }

  static async updateTodo(req, res){

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
        res.status(404).json({
          "message" : "data not found"
        })
      } else {
        res.status(200).json(todo[1][0])
      }
     
    } catch (error) {

        if(error.name === 'SequelizeValidationError'){
            res.status(400).json({
             "message" : "please input properly"
            })
        } else {

          if(error.name === 'SequelizeValidationError'){
            res.status(400).json({
             "message" : "please input properly"
            })
          } else {

            res.status(500).send(error)
          }
          
        }
    }
  }

  static async updateStatus(req, res){

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
        res.status(404).json({
          "message" : "data not found"
        })
      } else {
        res.status(200).json(todo[1][0])
      }
    } catch (error) {

        if(error.name === 'SequelizeValidationError'){
          res.status(400).json({
            "message" : "please input properly"
          })
        } else {

          res.status(500).send(error)
        }
    }
  }
  static async deleteById(req, res){
    try {
      const id = +req.params.id
      const deleteTodo = await Todo.destroy({
        where: {
          id: id
        }
      })
      res.status(200).json({
        "message" : "data succesfully delete"
      })
    } catch (error) {
      res.status(500).send(error)
    } 
  }
}
module.exports = TodoController