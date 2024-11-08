# Плейсхолдеры

## solution.js

Реализуйте и экспортируйте по умолчанию функцию. Функция должна принимать параметр с данными, для добавления в таблицу `articles`. Данные передаются в виде массива с объектами из двух свойств:

```
title
description
```

Функция должна добавлять записи в таблицу `articles` и возвращать `id` добавленных записей:

```js
import solution from "./solution.js";

const article = [
  {
    title: "Статья 1",
    description: "Описание статьи",
  },
  {
    title: "Статья 2",
    description: "Описание статьи 2",
  },
];

const ids = await solution(article); // => [1, 2]

const res = await sql`SELECT title, description FROM articles`;

console.log(res); // [{ title: 'Статья 1', description: 'Описание статьи' }, { title: 'Статья 2', description: 'Описание статьи 2' }]
```
