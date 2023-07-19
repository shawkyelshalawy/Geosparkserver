import crypto from 'crypto';
import { db } from '../datastore';
import {
  AddQuestionRequest,
  AddQuestionResponse, checkAnswerRequest, checkAnswerResponse,
  getQuestionRequest,
  getQuestionResponse,
} from '../shared/api';
import { ExpressHandlerWithParams } from '../types';
import { Question } from '../shared/types';
import { ERRORS } from '../shared/errors';

export const AddQuestionHandler: ExpressHandlerWithParams<
  { examId: string },
  AddQuestionRequest,
  AddQuestionResponse
> = async (req, res) => {
  if (!req.params.examId)
    return res.status(400).send({ error: ERRORS.Exam_ID_MISSING });

  if (
    !req.body.question ||
    !req.body.correctAnswer
  )
    return res.status(400).send({ error: ERRORS.Fields_ARE_MISSING });
  const exam = await db.getExamById(req.params.examId);
  if (!exam) return res.status(404).send({ error: ERRORS.Exam_Not_Found });
  const question: Question = {
    id: crypto.randomUUID(),
    question: req.body.question,
    correctAnswer: req.body.correctAnswer,
    examId: req.params.examId,
  };
  await db.AddQuestion(question);
  res.status(200).send(question);
};

export const getQuestionByIdHandler: ExpressHandlerWithParams<
  { questionId: string },
  getQuestionRequest,
  getQuestionResponse
> = async (req, res) => {
  if (!req.params.questionId)
    return res.status(400).send({ error: ERRORS.Question_ID_MISSING });
  const question = await db.getQuestionById(req.params.questionId);
  if (!question)
    return res.status(404).send({ error: ERRORS.Question_Not_Found });
  return res.status(200).send(question);
};

// check if answer is correct or not
export const checkAnswerHandler: ExpressHandlerWithParams<
  { questionId: string },
  checkAnswerRequest,
  checkAnswerResponse
> = async (req, res) => {
  if (!req.params.questionId)
    return res.status(400).send({error: ERRORS.Question_ID_MISSING});
  const question = await db.getQuestionById(req.params.questionId);
  if (!question)
    return res.status(404).send({error: ERRORS.Question_Not_Found});
  if (req.body.answer === question.correctAnswer) {
    return res.status(200).send({isCorrect: true});
  }
  return res.status(200).send({isCorrect: false});
};
