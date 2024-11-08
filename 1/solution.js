import postgres from "postgres";

// Настройки подключения к базе данных
const config = {
  host: "localhost",    // Адрес базы данных
  port: 5432,           // Порт PostgreSQL
  user: "postgres",     // Имя пользователя
  password: "",         // Пароль (пустой, так как используется "trust")
  database: "postgres"  // Имя базы данных
};

// Функция решения
const solution = async () => {
  const sql = postgres(config);

  // Создание таблицы "articles", если она еще не существует
  await sql`
    CREATE TABLE IF NOT EXISTS articles (
      title VARCHAR(255),
      description VARCHAR(255)
    )
  `;

  // Вставка одного записи в таблицу "articles"
  await sql`
    INSERT INTO articles (title, description) 
    VALUES ('First Article', 'This is a description of the first article')
  `;

  // Закрытие подключения
  await sql.end();
};

// Экспорт функции по умолчанию
export default solution;
