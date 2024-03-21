/* eslint-disable no-useless-catch */
const TodoListRepos = require('../repositories/todolist.repos');
const { TodoList } = require('../models');

class TodoListServ {
  static findAll = async () => {
    try {
      const todo = await TodoListRepos.findAll();
      return todo;
    } catch (error) {
      throw error;
    }
  };

  static findOne = async (id) => {
    try {
      const todo = await TodoListRepos.findOne(id);
      if (!todo) throw { code: 404 };
      return todo;
    } catch (error) {
      throw error;
    }
  };

  static create = async (body) => {
    try {
      const { title, description } = body;
      const findTitle = await TodoList.findAll({
        where: { title },
      });
      
      if (!title || !description) throw { code: 400 };
      if (findTitle.length > 0) throw { code: 409 };

      const todo = await TodoListRepos.create({ title, description });
      
      return todo;
    } catch (error) {
      throw error;
    }
  };

  static update = async (params) => {
    try {
      const { id, body } = params;
      const { title, description } = params.body;

      const isTodoExist = await TodoListRepos.findOne(id);
      const findTitle = await TodoList.findAll({ where: { title } });

      if (!isTodoExist) throw { code: 404 };
      if (findTitle.length > 0) throw { code: 409 };
      if (!title || !description) throw { code: 400 };

      await TodoListRepos.update(id, body);
    } catch (error) {
      throw error;
    }
  };

  static destroy = async (id) => {
    try {
      const isTodoExist = await TodoListRepos.findOne(id);
      if (!isTodoExist) throw { code: 404 };
      await TodoListRepos.destroy(id);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = TodoListServ;
