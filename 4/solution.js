import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

export default async (user, roomNumber, price) => {
  const sql = postgres(config);

  // Начинаем транзакцию
  const tx = sql.begin();

  try {
    // Вставляем нового пользователя
    const [newUser] = await tx`
      INSERT INTO users (username, phone)
      VALUES (${user.username}, ${user.phone})
      RETURNING id
    `;

    // Получаем ID комнаты, которую будем бронировать
    const [room] = await tx`
      SELECT id FROM rooms WHERE room_number = ${roomNumber} AND status = 'free' LIMIT 1
    `;
    
    // Если комната не найдена или уже забронирована, выбрасываем ошибку
    if (!room) {
      throw new Error("Room is not available or doesn't exist");
    }

    // Вставляем заказ
    await tx`
      INSERT INTO orders (user_id, room_id, price)
      VALUES (${newUser.id}, ${room.id}, ${price})
    `;

    // Обновляем статус комнаты на "reserved"
    await tx`
      UPDATE rooms SET status = 'reserved' WHERE id = ${room.id}
    `;

    // Завершаем транзакцию
    await tx.commit();
  } catch (error) {
    // В случае ошибки откатываем все изменения
    await tx.rollback();
    throw error; // Пробрасываем ошибку
  } finally {
    // Закрываем соединение с базой данных
    await sql.end();
  }
};
