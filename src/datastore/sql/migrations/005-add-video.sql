CREATE TABLE videos (
  id        VARCHAR NOT NULL PRIMARY KEY,
  title     VARCHAR NOT NULL,
  url       VARCHAR NOT NULL,
  chapterId VARCHAR NOT NULL,
  FOREIGN KEY (chapterId) REFERENCES chapters(id)
);



-- CREATE TABLE exams (
--   id VARCHAR NOT NULL PRIMARY KEY,
--   title VARCHAR NOT NULL,
--   courseId VARCHAR NOT NULL,
--   chapterId VARCHAR NOT NULL,
--   FOREIGN KEY (courseId) REFERENCES courses(id),
--   FOREIGN KEY (chapterId) REFERENCES chapters(id)
-- );


-- CREATE TABLE questions (
--   id VARCHAR NOT NULL PRIMARY KEY,
--   question VARCHAR NOT NULL,
--   correctAnswer VARCHAR NOT NULL,
--   option1 VARCHAR NOT NULL,
--   option2 VARCHAR NOT NULL,
--   option3 VARCHAR NOT NULL,
--   examId VARCHAR NOT NULL,
--   FOREIGN KEY (examId) REFERENCES exams(id)
-- );


-- create TABLE answers (
--   id VARCHAR NOT NULL PRIMARY KEY,
--   answer VARCHAR NOT NULL,
--   questionId VARCHAR NOT NULL,
--   FOREIGN KEY (questionId) REFERENCES questions(id)
-- );

-- CREATE table results (
--   id VARCHAR NOT NULL PRIMARY KEY,
--   score VARCHAR NOT NULL,
--   examId VARCHAR NOT NULL,
--   userId VARCHAR NOT NULL,
--   FOREIGN KEY (examId) REFERENCES exams(id),
--   FOREIGN KEY (userId) REFERENCES users(id)
-- );