CREATE TABLE  IF NOT EXISTS videos (
  id        VARCHAR NOT NULL PRIMARY KEY,
  title     VARCHAR NOT NULL,
  url       VARCHAR NOT NULL,
  chapterId VARCHAR NOT NULL,
  FOREIGN KEY (chapterId) REFERENCES chapters(id)
);






-- create TABLE answers (
--   id VARCHAR NOT NULL PRIMARY KEY,
--   answer VARCHAR NOT NULL,
--   questionId VARCHAR NOT NULL,
--   FOREIGN KEY (questionId) REFERENCES questions(id)
-- );





CREATE TABLE users (
  id VARCHAR NOT NULL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  role VARCHAR NOT NULL
);

CREATE TABLE courses (
  id VARCHAR NOT NULL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  price VARCHAR NOT NULL,
  userId VARCHAR NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE chapters (
  id VARCHAR NOT NULL PRIMARY KEY,
  title VARCHAR NOT NULL,
  courseId VARCHAR NOT NULL,
  FOREIGN KEY (courseId) REFERENCES courses(id)
);

CREATE TABLE videos (
  id VARCHAR NOT NULL PRIMARY KEY,
  title VARCHAR NOT NULL,
  url VARCHAR NOT NULL,
  chapterId VARCHAR NOT NULL,
  FOREIGN KEY (chapterId) REFERENCES chapters(id)
);

CREATE TABLE exams (
  id VARCHAR NOT NULL PRIMARY KEY,
  title VARCHAR NOT NULL,
  courseId VARCHAR NOT NULL,
  chapterId VARCHAR NOT NULL,
  FOREIGN KEY (courseId) REFERENCES courses(id),
  FOREIGN KEY (chapterId) REFERENCES chapters(id)
);

CREATE TABLE questions (
  id VARCHAR NOT NULL PRIMARY KEY,
  question VARCHAR NOT NULL,
  correctAnswer VARCHAR NOT NULL,
  option1 VARCHAR NOT NULL,
  option2 VARCHAR NOT NULL,
  option3 VARCHAR NOT NULL,
  examId VARCHAR NOT NULL,
  FOREIGN KEY (examId) REFERENCES exams(id)
);

CREATE TABLE answers (
  id VARCHAR NOT NULL PRIMARY KEY,
  answer VARCHAR NOT NULL,
  questionId VARCHAR NOT NULL,
  FOREIGN KEY (questionId) REFERENCES questions(id)
);

CREATE TABLE userAnswers (
  id VARCHAR NOT NULL PRIMARY KEY,
  userId VARCHAR NOT NULL,
  answerId VARCHAR NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (answerId) REFERENCES answers(id)
);

CREATE TABLE userExams (

  id VARCHAR NOT NULL PRIMARY KEY,
  userId VARCHAR NOT NULL,
  examId VARCHAR NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (examId) REFERENCES exams(id)
);

-- CREATE TABLE userCourses (
