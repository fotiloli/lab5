import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

const sql = postgres(config);

const solution = async (articles) => {
  const insertedIds = [];

  for (const article of articles) {
    const { title, description } = article;
    
    // Insert data into the articles table and get the returned id
    const result = await sql`
      INSERT INTO articles (title, description)
      VALUES (${title}, ${description})
      RETURNING id
    `;
    
    // Push the inserted id to the result array
    insertedIds.push(result[0].id);
  }

  return insertedIds;
};

export default solution;
