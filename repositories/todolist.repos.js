/* eslint-disable no-useless-catch */
const { TodoList } = require('../models');

class TodoListRepos {
  static findAll = async () => {
    try {
      const todo = await TodoList.findAll();
      return todo;
    } catch (error) {
      throw error;
    }
  };

  static findOne = async (id) => {
    try {
      const todo = await TodoList.findOne({ where: { id } });
      return todo;
    } catch (error) {
      throw error;
    }
  };

  static create = async (body) => {
    try {
      const todo = await TodoList.create(body);
      return todo;
    } catch (error) {
      throw error;
    }
  };

  static update = async (id, body) => {
    try {
      const todo = await TodoList.findOne({ where: { id } });
      await todo.update(body);
    } catch (error) {
      throw error;
    }
  };

  static destroy = async (id) => {
    try {
      const todo = await TodoList.findOne({ where: { id } });
      await todo.destroy();
    } catch (error) {
      throw error;
    }
  };
}

module.exports = TodoListRepos;
