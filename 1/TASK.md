# Общие принципы работы

## solution.js

Реализуйте и экспортируйте по умолчанию функцию. Функция должна создавать таблицу `articles` с двумя полями:

```sql
title VARCHAR(255)
description VARCHAR(255)
```

Также функция должна добавлять как минимум одну запись в таблицу.

Пример:

```js
await solution();

const res = await client.query("SELECT * FROM articles;");

console.log(res.rows.length > 0); // true
```
