CREATE TABLE users (
  id serial PRIMARY KEY,
  username VARCHAR(100),
  email text UNIQUE NOT NULL,
  entries BIGINT DEFAULT 0,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE logins (
  id serial PRIMARY KEY,
  hash varchar(100) NOT NULL,
  email text UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL
);

INSERT INTO users (id, name, email, entries, joined)
VALUES (1, 'john_doe', 'john@example.com', 0, '2024-11-10 14:30:00');

INSERT INTO logins (id, hash, email)
VALUES (1, '123Admin@', 'john@exampl.com');