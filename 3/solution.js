import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// Создаем пул подключений один раз и используем его в дальнейшем
const sql = postgres(config);

export default async (book) => {
  // Вставляем книгу в таблицу 'books'
  await sql`
    INSERT INTO books (title, author)
    VALUES (${book.title}, ${book.author})
  `;
};
