const { Todo } = require('../models')

class todoController {

  static async addNewTodo(req, res){

    const { title, description, status, due_date } = req.body
    
    const obj = {
      title,
      description,
      status,
      due_date
    }
    try {
      const todo = await Todo.create(obj) 
      await res.status(201).json(todo)
    } catch (error) {
      res.status(500).send(error)
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
     
     res.status(200).json(todo)
     
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
      res.status(200).json(todo[1][0])
    } catch (error) {
      res.status(500).send(error)
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
      res.status(200).json(todo[1][0])
    } catch (error) {
      res.status(500).send(error)
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
module.exports = todoController