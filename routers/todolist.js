const router = require('express').Router();
const TodoList = require('../controllers/todolist.controller');

router.get('/', TodoList.findAll);
router.get('/:id', TodoList.findOne);
router.post('/', TodoList.create);
router.put('/:id', TodoList.update);
router.delete('/:id', TodoList.destroy);

module.exports = router;
