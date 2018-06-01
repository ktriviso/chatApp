\c iochat_db

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS chatroom CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS reference CASCADE;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(28) UNIQUE NOT NULL,
  password VARCHAR(28) NOT NULL
);

CREATE TABLE chatroom (
  chatroom_id SERIAL PRIMARY KEY,
  name VARCHAR(28) UNIQUE NOT NULL
);

CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  content VARCHAR(255) NOT NULL,
  name VARCHAR(28) NOT NULL,
  chatroom VARCHAR(28) NOT NULL
);

CREATE TABLE reference (
  username VARCHAR(28),
  chatroom_id INT
);
