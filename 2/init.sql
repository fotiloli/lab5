DROP TABLE IF EXISTS articles;

CREATE TABLE articles
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255)
);
