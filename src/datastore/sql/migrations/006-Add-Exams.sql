CREATE TABLE exams (
  id VARCHAR NOT NULL PRIMARY KEY,
  title VARCHAR NOT NULL,
  courseId VARCHAR NOT NULL,
  chapterId VARCHAR NOT NULL,
  FOREIGN KEY (courseId) REFERENCES courses(id),
  FOREIGN KEY (chapterId) REFERENCES chapters(id)
);
