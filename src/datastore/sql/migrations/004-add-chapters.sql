CREATE TABLE  IF NOT EXISTS chapters (
  id      VARCHAR NOT NULL PRIMARY KEY,
  title   VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  courseId VARCHAR NOT NULL,
  FOREIGN KEY (courseId) REFERENCES courses(id)
);

CREATE INDEX IF NOT EXISTS chapters_Id_idx ON chapters(id);