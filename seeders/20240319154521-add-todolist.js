'use strict';

const fs = require('fs');

let data = fs.readFileSync('./todolist.json', 'utf-8'); // MEMBACA FILE TODOLIST.JSON
data = JSON.parse(data).map((item) => ({
  title: item.name,
  description: item.description,
  createdAt: new Date(),
  updatedAt: new Date(),
})); // PARSING JSON DAN LOOPING DATA
// console.log(data);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TodoLists', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TodoLists', null, {});
  },
};
