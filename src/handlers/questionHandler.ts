import crypto from 'crypto';
import { db } from '../datastore';
import {
  AddQuestionRequest,
  AddQuestionResponse,
  checkAnswerRequest,
  checkAnswerResponse,
  getQuestionRequest,
  getQuestionResponse,
  listExamQuestionsRequest,
  listExamQuestionsResponse,
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
    !req.body.correctAnswer ||
    !req.body.option1 ||
    !req.body.option2 ||
    !req.body.option3
  )
    return res.status(400).send({ error: ERRORS.Fields_ARE_MISSING });
  const exam = await db.getExamById(req.params.examId);
  if (!exam) return res.status(404).send({ error: ERRORS.Exam_Not_Found });
  const question: Question = {
    id: crypto.randomUUID(),
    question: req.body.question,
    correctAnswer: req.body.correctAnswer,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    examId: req.params.examId,
  };
  await db.AddQuestion(question);
  res.status(200).send(question as AddQuestionResponse);
};

export const getQuestionByIdHandler: ExpressHandlerWithParams<
  { questionId: string },
  getQuestionRequest,
    getQuestionResponse
> = async (req, res) => {
  if (!req.params.questionId)
    return res.status(400).send({error: ERRORS.Question_ID_MISSING});
  const question = await db.getQuestionById(req.params.questionId);
  if (!question)
    return res.status(404).send({error: ERRORS.Question_Not_Found});
  // return only question and options

  res.status(200).send({
    question: question.question,
    option1: question.option1,
    option2: question.option2,
    option3: question.option3
  });
};
// check if answer is correct or not
export const checkAnswerHandler: ExpressHandlerWithParams<
  { questionId: string },
  checkAnswerRequest,
  checkAnswerResponse
> = async (req, res) => {
  if (!req.params.questionId)
    return res.status(400).send({ error: ERRORS.Question_ID_MISSING });
  const question = await db.getQuestionById(req.params.questionId);
  if (!question)
    return res.status(404).send({ error: ERRORS.Question_Not_Found });
  if (req.body.answer === question.correctAnswer) {
    return res.status(200).send({ isCorrect: true });
  }
  return res.status(200).send({ isCorrect: false });
};


export const listExamQuestionsHandler: ExpressHandlerWithParams<
  { examId: string },
  null,
  listExamQuestionsResponse> = async (
      req,
      res
) => {
  if (!req.params.examId)
    return res.status(400).send({ error: ERRORS.Exam_ID_MISSING });
  const questions = await db.getExamQuestions(req.params.examId);
  if (!questions)
    return res.status(404).send({ error: ERRORS.Question_Not_Found });
  // return only question and options

  res.status(200).send({
    questions : questions.map((question) => ({
      id: question.id,
      question: question.question,
      option1: question.option1,
      option2: question.option2,
      option3: question.option3
    })),
  });
};
