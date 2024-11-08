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
    DROP TABLE IF EXISTS articles
  `;

  await sql`
    CREATE TABLE articles(id SERIAL PRIMARY KEY, title VARCHAR(255), description VARCHAR(255))
  `;

  await sql.end();
});

test("Check solution", async () => {
  const title = "some title";
  const description =
    "'); INSERT INTO description (title, description) VALUES ('i am hacker', 'hello";
  const article1 = {
    title,
    description,
  };
  const article2 = {
    title: "Курс по SQL",
    description: "Базовый курс по базам данных",
  };
  const result = await solution([article1, article2]);

  expect(result).toStrictEqual([1, 2]);

  const sql = postgres(config);

  const res = await sql`SELECT title, description FROM articles`;

  expect(res).toEqual([article1, article2]);

  await sql.end();
});
