const router = require('express').Router()
const todoController = require('../controllers/todoController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.post('/', todoController.addNewTodo)
router.get('/', todoController.showAllTodo)
router.get('/:id',authorization, todoController.showTodoById)
router.put('/:id', authorization, todoController.updateTodo)
router.patch('/:id', authorization, todoController.updateStatus)
router.delete('/:id', authorization, todoController.deleteById)


module.exports = router