CREATE TABLE chapters (
  id      VARCHAR NOT NULL PRIMARY KEY,
  title   VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  courseId VARCHAR NOT NULL,
  FOREIGN KEY (courseId) REFERENCES courses(id)
);

CREATE INDEX chapters_Id_idx ON chapters(id);