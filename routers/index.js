const router = require('express').Router();
const todoRouter = require('./todolist');

router.use('/api/todolist', todoRouter);

module.exports = router;
