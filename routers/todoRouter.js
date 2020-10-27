const router = require('express').Router()
const todoController = require('../controllers/todoController')
const authentocation = require('../middleware/authentication')
const autherization = require('../middleware/authorization')

router.use(authentocation)
router.post('/', todoController.addNewTodo)
router.get('/', todoController.showAllTodo)
router.get('/:id', todoController.showTodoById)
router.put('/:id', autherization, todoController.updateTodo)
router.patch('/:id', autherization, todoController.updateStatus)
router.delete('/:id', autherization, todoController.deleteById)


module.exports = router