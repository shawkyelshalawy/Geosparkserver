CREATE table results (
  id VARCHAR NOT NULL PRIMARY KEY,
  score VARCHAR NOT NULL,
  examId VARCHAR NOT NULL,
  userId VARCHAR NOT NULL,
  FOREIGN KEY (examId) REFERENCES exams(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);
