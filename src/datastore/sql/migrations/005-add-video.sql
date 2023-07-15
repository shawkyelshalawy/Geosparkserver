CREATE TABLE videos (
  id        VARCHAR NOT NULL PRIMARY KEY,
  title     VARCHAR NOT NULL,
  url       VARCHAR NOT NULL,
  chapterId VARCHAR NOT NULL,
  FOREIGN KEY (chapterId) REFERENCES chapters(id)
);