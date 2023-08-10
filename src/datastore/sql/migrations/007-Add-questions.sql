CREATE TABLE  IF NOT EXISTS questions (
      id VARCHAR NOT NULL PRIMARY KEY,
      question VARCHAR NOT NULL,
      correctAnswer VARCHAR NOT NULL,
      option1 VARCHAR NOT NULL,
      option2 VARCHAR NOT NULL,
      option3 VARCHAR NOT NULL,
      examId VARCHAR NOT NULL,
      FOREIGN KEY (examId) REFERENCES exams(id)
);
