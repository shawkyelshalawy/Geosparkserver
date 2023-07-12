import crypto from 'crypto';
import { db } from '../datastore';
import { ExpressHandler, ExpressHandlerWithParams } from '../types';
import { Chapter } from '../shared/types';
import {
  CreateChapterRequest,
  CreateChapterResponse,
  DeleteChapterRequest,
  DeleteChapterResponse,
  GetChapterRequest,
  GetChapterResponse,
  listChapterRequest,
  listChapterResponse,
} from '../shared/api';
import { ERRORS } from '../shared/errors';

// @desc      Add course
// @route     POST /Course/:courseID/chapter
// @access    Private
export const createChapterHandler: ExpressHandlerWithParams<
  { courseId: string },
  CreateChapterRequest,
  CreateChapterResponse
> = async (req, res) => {
  if (!req.params.courseId)
    return res.status(400).send({ error: ERRORS.Course_ID_MISSING });
  if (!req.body.title || !req.body.description)
    return res.status(400).send({ error: ERRORS.Fields_ARE_MISSING });
  if (!(await db.getCourseById(req.params.courseId)))
    return res.status(404).send({ error: ERRORS.Course_Not_Found });
  const chapter: Chapter = {
    id: crypto.randomUUID(),
    title: req.body.title,
    description: req.body.description,
    courseId: req.params.courseId,
  };
  await db.CreateChapter(chapter);
  res.status(200).send(chapter);
};

export const getChapterByIdHandler: ExpressHandlerWithParams<
  { id: string },
  GetChapterRequest,
  GetChapterResponse
> = async (req, res) => {
  if (!req.params.id)
    return res.status(400).send({ error: ERRORS.Chapter_ID_MISSING });
  const chapter = await db.getChapterById(req.params.id);
  if (!chapter)
    return res.status(404).send({ error: ERRORS.Chapter_Not_Found });
  res.status(200).send(chapter);
};

export const getChaptersByCourseIdHandler: ExpressHandlerWithParams<
  { courseId: string },
  listChapterRequest,
  listChapterResponse
> = async (req, res) => {
  if (!req.params.courseId)
    return res.status(400).send({ error: ERRORS.Course_ID_MISSING });
  const chapters = await db.getChaptersByCourseId(req.params.courseId);
  if (!chapters)
    return res.status(404).send({ error: ERRORS.Chapter_Not_Found });
  res.status(200).send({
    chapters: chapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      description: chapter.description,
    })),
  });
};
export const deleteChapterHandler: ExpressHandlerWithParams<
  { id: string },
  DeleteChapterRequest,
  DeleteChapterResponse
> = async (req, res) => {
  if (!req.params.id)
    return res.status(400).send({ error: ERRORS.Chapter_ID_MISSING });
  const chapter = await db.getChapterById(req.params.id);
  if (!chapter)
    return res.status(404).send({ error: ERRORS.Chapter_Not_Found });
  await db.DeleteChapter(req.params.id);
  res.status(200).send({ message: 'Chapter deleted successfully' });
};
