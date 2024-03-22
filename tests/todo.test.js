const app = require("../app"); // DIBUTUHKAN UNTUK MEMANGGIL ROUTER
const request = require("supertest"); // DIBUTUHKAN UNTUK TEST REQUEST API
const { sequelize } = require("../models"); // DIBUTUHkAN UNTUK MEMANGGIL queryInterface
const { queryInterface } = sequelize; // DIBUTUHKAN UNTUK SEEDING DATA KE DATABASE TEST
const baseUrl = "/api/todolist"; // ADDRESS API

// DUMMY DATA UNTUK SEEDING TESTING
const seedingData = [
  {
    id: 1001,
    title: "Beli hadiah ulang tahun",
    description: "Beli kado untuk teman yang ulang tahun besok.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1002,
    title: "Buat presentasi proyek",
    description: "Menyiapkan slide presentasi untuk rapat minggu depan.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1003,
    title: "Olahraga pagi",
    description: "Lari selama 30 menit di taman sebelah.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// FUNGSI JEST UNTUK MENJALANKAN KONDISI SEBELUM TEST DIMULAI
beforeAll(async () => {
  try {
    await queryInterface.bulkInsert("TodoLists", seedingData, {}); // SEED BULK DATA
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

        expect(data.length).toEqual(3); // EKSPEKTASI PANJANG DATA 3
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
      .catch(err => {
        done(err);
      }); // TEST GAGAL
  });
});

describe("get todolist by id", () => {
  test("GET /todolist/:id", done => {
    request(app)
      .get(`${baseUrl}/1001`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        const { body } = response;
        const { id, title, description } = body;

        expect(id).toEqual(1001);
        expect(title).toBe("Beli hadiah ulang tahun");
        expect(description).toBe(
          "Beli kado untuk teman yang ulang tahun besok."
        );
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  test("error: not found", done => {
    request(app)
      .get(`${baseUrl}/9999`)
      .expect("Content-Type", /json/)
      .expect(404)
      .then(response => {
        const { body } = response;
        const { message } = body;

        expect(message).toBe("Todo Not Found!");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe("create todolist", () => {
  test("POST /todolist", done => {
    const newTodo = {
      title: "Main futsal",
      description: "Main futsal sparingan.",
    };

    request(app)
      .post(`${baseUrl}`)
      .send(newTodo)
      .expect("Content-Type", /json/)
      .expect(201)
      .then(response => {
        const { body } = response;
        const { message, todo } = body;

        expect(message).toBe("Todo created successfully");
        expect(todo).toEqual(expect.objectContaining(newTodo));
        expect(todo.title).toBe("Main futsal");
        expect(todo.description).toBe("Main futsal sparingan.");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  test("error: already exist", done => {
    const newTodo = {
      title: "Main futsal", // VALUE SUDAH TERSEDIA
      description: "Main futsal sparingan.",
    };

    request(app)
      .post(`${baseUrl}`)
      .send(newTodo)
      .expect("Content-Type", /json/)
      .expect(409)
      .then(response => {
        const { body } = response;

        expect(body.message).toBe("Already exists");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  test("error: internal server error", done => {
    const newTodo = {
      itle: "Main futsal", // KEY NYA TYPO
      desciption: "Main futsal sparingan.", // KEY NYA TYPO
    };

    request(app)
      .post(`${baseUrl}`)
      .send(newTodo)
      .expect("Content-Type", /json/)
      .expect(500)
      .then(response => {
        const { body } = response;

        expect(body.message).toBe("Internal Server Error!");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe("update todolist", () => {
  test("PUT /todolist/:id", done => {
    const updateTodo = {
      title: "Ngoding",
      description: "Fixing bug",
    };

    request(app)
      .put(`${baseUrl}/1003`)
      .send(updateTodo)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        const { body } = response;
        const { message, todo } = body;

        expect(message).toBe("Todo updated successfully");
        expect(todo).toEqual(expect.objectContaining(updateTodo));
        expect(todo.title).toBe("Ngoding");
        expect(todo.description).toBe("Fixing bug");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  test("error: not found", done => {
    request(app)
      .get(`${baseUrl}/9999`)
      .expect("Content-Type", /json/)
      .expect(404)
      .then(response => {
        const { body } = response;
        const { message } = body;

        expect(message).toBe("Todo Not Found!");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  test("error: already exist", done => {
    const updateTodo = {
      title: "Ngoding", // VALUE SUDAH TERSEDIA
      description: "Fixing bug",
    };

    request(app)
      .put(`${baseUrl}/1002`)
      .send(updateTodo)
      .expect("Content-Type", /json/)
      .expect(409)
      .then(response => {
        const { body } = response;

        expect(body.message).toBe("Already exists");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  test("error: internal server error", done => {
    const updateTodo = {
      itle: "Main futsal", // KEY NYA TYPO
      desciption: "Main futsal sparingan.", // KEY NYA TYPO
    };

    request(app)
      .put(`${baseUrl}/1003`)
      .send(updateTodo)
      .expect("Content-Type", /json/)
      .expect(500)
      .then(response => {
        const { body } = response;

        expect(body.message).toBe("Internal Server Error!");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe("delete todolist", () => {
  test("DELETE /todolist/:id", done => {
    request(app)
      .delete(`${baseUrl}/1003`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        const { body } = response;

        expect(body.message).toBe("Todo deleted successfully");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  test("error: not found", done => {
    request(app)
      .get(`${baseUrl}/9999`)
      .expect("Content-Type", /json/)
      .expect(404)
      .then(response => {
        const { body } = response;
        const { message } = body;

        expect(message).toBe("Todo Not Found!");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});