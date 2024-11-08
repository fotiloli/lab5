import postgres from "postgres";
import solution from "../solution.js";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

beforeEach(async () => {
  const sql = postgres(config);

  await sql`
    DROP TABLE IF EXISTS rooms, orders, users
  `;

  await sql`
    CREATE TABLE rooms(id SERIAL PRIMARY KEY, room_number INT, places INT, status VARCHAR(255))
  `;

  await sql`
    CREATE TABLE orders(id SERIAL PRIMARY KEY, user_id INT, room_id INT, price INT)
  `;

  await sql`
    CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(255), phone VARCHAR(255))
  `;

  await sql`
    INSERT INTO rooms(room_number, places, status) VALUES
    (2, 2, 'free'),
    (3, 5, 'free');
  `;

  await sql.end();
});

test("Check solution positive", async () => {
  const user = {
    username: "Ivan",
    phone: "+123456789",
  };
  await solution(user, 2, 1000);

  const sql = postgres(config);

  const res1 = await sql`SELECT username, phone FROM users`;

  expect(res1).toEqual([user]);

  const res2 = await sql`SELECT room_id, price FROM orders`;

  expect(res2).toEqual([{ room_id: 1, price: 1000 }]);

  const res3 = await sql`SELECT status FROM rooms WHERE id = 1`;

  expect(res3).toEqual([{ status: "reserved" }]);
  sql.end();
});

test("Check solution negative", async () => {
  const user = {
    username: "Ivan",
    phone: "+123456789",
  };

  const sql = postgres(config);

  await expect(solution(user, "error", 1000)).rejects.toThrow();

  const res1 = await sql`SELECT username, phone FROM users`;

  expect(res1).toEqual([]);

  const res2 = await sql`SELECT room_id, price FROM orders`;

  expect(res2).toEqual([]);

  const res3 = await sql`SELECT status FROM rooms WHERE id = 1`;

  expect(res3).toEqual([{ status: "free" }]);

  sql.end();
});
