import crypto from 'crypto';
import { db } from '../datastore';
import {
  CreateExamRequest,
  CreateExamResponse,
  GetExamRequest,
  GetExamResponse,
} from '../shared/api';
import { ExpressHandlerWithParams } from '../types';
import { ERRORS } from '../shared/errors';
import { Exam } from '../shared/types';

export const CreatExamHandler: ExpressHandlerWithParams<
  { chapterId: string },
  CreateExamRequest,
  CreateExamResponse
> = async (req, res) => {
  if (!req.params.chapterId)
    return res.status(400).send({ error: ERRORS.Chapter_ID_MISSING });
  if (!req.body.title) {
    return res.status(400).send({ error: ERRORS.Fields_ARE_MISSING });
  }
  const chapter = await db.getChapterById(req.params.chapterId);
  if (!chapter)
    return res.status(404).send({ error: ERRORS.Chapter_Not_Found });
  const exam: Exam = {
    id: crypto.randomUUID(),
    title: req.body.title,
    chapterId: req.params.chapterId,
    courseId: chapter.courseId,
  };
  await db.CreateExam(exam);
  res.status(200).send(exam);
};

export const getExamByIdHandler: ExpressHandlerWithParams<
  { examId: string },
  GetExamRequest,
  GetExamResponse
> = async (req, res) => {
  if (!req.params.examId)
    return res.status(400).send({ error: ERRORS.Exam_ID_MISSING });
  const exam = await db.getExamById(req.params.examId);
  if (!exam) return res.status(404).send({ error: ERRORS.Exam_Not_Found });
  return res.status(200).send(exam);
};
