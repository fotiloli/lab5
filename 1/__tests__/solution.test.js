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

  await sql.end();
});

test("Check solution", async () => {
  await solution();

  const sql = postgres(config);

  const res = await sql`SELECT title, description FROM articles`;

  expect(res.length).toBeGreaterThan(0);

  await sql.end();
});
