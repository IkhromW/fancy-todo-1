const router = require('express').Router()
const todoController = require('../controllers/todoController')

router.post('/', todoController.addNewTodo)
router.get('/', todoController.showAllTodo)
router.get('/:id', todoController.showTodoById)
router.put('/:id',todoController.updateTodo)
router.patch('/:id', todoController.updateStatus)
router.delete('/:id',todoController.deleteById)


module.exports = router