const app = require("../app"); // DIBUTUHKAN UNTUK MEMANGGIL ROUTER
const request = require("supertest"); // DIBUTUHKAN UNTUK TEST REQUEST API
const fs = require("fs"); // DIBUTUHKAN UNTUK MEMANGGIL FILE
const { sequelize } = require("../models"); // DIBUTUHkAN UNTUK MEMANGGIL queryInterface
const { queryInterface } = sequelize; // DIBUTUHKAN UNTUK SEEDING DATA KE DATABASE TEST
const baseUrl = "/api/todolist"; // ADDRESS API

// DATA BERASAL DARI FILE todolist.json YANG SAMA DIGUNAKAN PADA PROSES SEEDERS DEVELOPMENT
const seedData = JSON.parse(fs.readFileSync("./todolist.json", "utf-8")).map(
  item => ({
    title: item.name,
    description: item.description,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
);

// FUNGSI JEST UNTUK MENJALANKAN KONDISI SEBELUM TEST DIMULAI
beforeAll(async () => {
  try {
    await queryInterface.bulkInsert("TodoLists", seedData, {}); // SEED BULK DATA
  } catch (error) {
    console.log(error);
  }
});

// FUNGSI JEST UNTUK MENJALANKAN KONDISI SESUDAH TEST BERAKHIR
afterAll(async () => {
  try {
    await queryInterface.bulkDelete("TodoLists", null); // DELETE BULK DATA
  } catch (error) {
    console.log(error);
  }
});

// describe = FUNGSI JEST UNTUK GROUPING TESTING
describe("get all todolist", () => {
  test("GET /todolist", done => {
    request(app) // MEMANGGIL ROUTER
      .get(`${baseUrl}`) // DENGAN METHOD GET KE API BASE URL
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        const { body } = response;
        const { data } = body;

        expect(data.length).toEqual(15); // PANJANG DATA YANG DIDAPATKAN ADALAH 15
        data.forEach(item => {
          expect(item).toEqual(
            // TERDAPAT PROPERTI DAN TIPE DATA NILAI YANG SESUAI DARI RESPONSE
            expect.objectContaining({
              id: expect.any(Number), // any = FUNGSI JEST UNTUK MATCHER
              title: expect.any(String),
              description: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            })
          );
        });
        done(); // TEST SELESAI
      })
      .catch(done); // TEST GAGAL
  });
});
