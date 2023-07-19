CREATE TABLE questions (
                           id VARCHAR NOT NULL PRIMARY KEY,
                           question VARCHAR NOT NULL,
                           correctAnswer VARCHAR NOT NULL,
                           examId VARCHAR NOT NULL,
                           FOREIGN KEY (examId) REFERENCES exams(id)
);
