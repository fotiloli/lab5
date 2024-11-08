import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// Реализуем функцию, которая вставляет книгу в таблицу
export default async (book) => {
  // Создаем пул соединений с использованием конфигурации
  const sql = postgres(config);

  // Вставляем данные о книге в таблицу books
  await sql`
    INSERT INTO books (title, author)
    VALUES (${book.title}, ${book.author})
  `;

  // Закрываем соединение (оно автоматически возвращается в пул)
  await sql.end();
};
