CREATE TABLE users (
  id        VARCHAR NOT NULL PRIMARY KEY,
  firstName VARCHAR NOT NULL,
  lastName  VARCHAR NOT NULL,
  email     VARCHAR UNIQUE NOT NULL,
  password  VARCHAR NOT NULL,
  isAdmin   BOOLEAN NOT NULL  CHECK (isAdmin IN (0, 1)),
  subscribed BOOLEAN NOT NULL CHECK (subscribed IN (0, 1))
);


CREATE INDEX users_email_idx ON users (email);
CREATE INDEX users_id_idx ON users (id);
