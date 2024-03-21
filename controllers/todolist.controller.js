/* eslint-disable no-unused-vars */
const { param } = require('../routers/todolist');
const TodoListServ = require('../services/todolist.service');

class TodoList {
  static findAll = async (req, res, next) => {
    try {
      const todo = await TodoListServ.findAll();
      res.status(200).json({ data: todo });
    } catch (error) {
      next(error);
    }
  };

  static findOne = async (req, res, next) => {
    try {
      const todo = await TodoListServ.findOne(req.params.id);
      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      const todo = await TodoListServ.create(req.body);
      res.status(201).json({ message: "Todo created successfully", todo });
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const params = {
        id: req.params.id,
        body: req.body,
      };
      await TodoListServ.update(params);
      res.status(200).json({ message: 'Todo updated successfully', todo: params.body });
    } catch (error) {
      next(error);
    }
  };

  static destroy = async (req, res, next) => {
    try {
      await TodoListServ.destroy(req.params.id);
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = TodoList;
