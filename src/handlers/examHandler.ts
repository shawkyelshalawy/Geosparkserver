import crypto from 'crypto';
import { db } from '../datastore';
import {
  CreateExamRequest,
  CreateExamResponse,
  GetExamRequest,
  GetExamResponse,
  deleteExamRequest,
  deleteExamResponse,
  listExamsRequest,
  listExamsResponse,
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

export const deleteExamHandler: ExpressHandlerWithParams<
  { examId: string },
  deleteExamRequest,
  deleteExamResponse
> = async (req, res) => {
  if (!req.params.examId)
    return res.status(400).send({ error: ERRORS.Exam_ID_MISSING });
  const exam = await db.getExamById(req.params.examId);
  if (!exam) return res.status(404).send({ error: ERRORS.Exam_Not_Found });
  await db.deleteExam(req.params.examId);
  return res.status(200).send({ message: 'Exam deleted successfully' });
};
export const getAllExamsHandler: ExpressHandlerWithParams<
  { chapterId: string },
  listExamsRequest,
  listExamsResponse
> = async (req, res) => {
  if (!req.params.chapterId)
    return res.status(400).send({ error: ERRORS.Chapter_ID_MISSING });
  const chapter = await db.getChapterById(req.params.chapterId);
  if (!chapter)
    return res.status(404).send({ error: ERRORS.Chapter_Not_Found });
  const exams = await db.getAllexams();
  const examsInChapter = exams.filter(
    (exam) => exam.chapterId === req.params.chapterId
  );
  return res.status(200).send({ exams: examsInChapter });
};

// function that make sure that the user can't take the exam more than once


export const  CheckElgiablityToTakeExam = async (req: any, res: any, next: any)=> {
  const examId = req.params.examId;
  const userId = res.locals.userId;
  const result = await db.getResultsForaUser(userId);
  const takenExam = result.filter((exam: any) => exam.exam_id === examId);
    if (takenExam.length > 0) {
        return res.status(401).send({ error: ERRORS.Exam_Taken });
    }
    return next();
}
