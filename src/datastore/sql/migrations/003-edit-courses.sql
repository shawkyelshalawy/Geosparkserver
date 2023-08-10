CREATE TABLE  IF NOT EXISTS courses (
  id           VARCHAR NOT NULL PRIMARY KEY,
  userId       VARCHAR NOT NULL ,
  title        VARCHAR NOT NULL,
  description  VARCHAR NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);
