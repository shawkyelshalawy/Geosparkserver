import crypto from 'crypto';
import { db } from '../datastore';
import {ExpressHandlerWithParams} from "../types";
import {addResultRequest, addResultResponse, listUserResultsResponse} from "../shared/api";
import {ERRORS} from "../shared/errors";
import {Result} from "../shared/types";


// insert user result of the exam
export const AddResultHandler: ExpressHandlerWithParams<
    { examId: string },
    addResultRequest,
    addResultResponse
> = async (req, res) => {
    if (!req.params.examId)
        return res.status(400).send({ error: ERRORS.Exam_ID_MISSING });
    if (!req.body.score)
        return res.status(400).send({ error: ERRORS.Fields_ARE_MISSING });
    const exam = await db.getExamById(req.params.examId);
    if (!exam) return res.status(404).send({ error: ERRORS.Exam_Not_Found });
    const result: Result = {
        id: crypto.randomUUID(),
        score: req.body.score,
        examId: req.params.examId,
        userId: res.locals.userId,
    };
    await db.insertResult(result);
    res.status(200).send({message: "result added successfully"} )
}
// get all results of a user
export const getUserResultsHandler: ExpressHandlerWithParams<
    { userId: string },
    null,
    any
> = async (req, res) => {
    if (!req.params.userId)
        return res.status(400).send({ error: ERRORS.User_ID_MISSING });
    const results = await db.getResultsForaUser(req.params.userId);
    if (!results) return res.status(404).send({ error: ERRORS.USER_NOT_FOUND});
    res.status(200).send(results);
}

export const getExamResultsHandler: ExpressHandlerWithParams<
    { examId: string },
    null,
    any
> = async (req, res) => {
    if (!req.params.examId)
        return res.status(400).send({ error: ERRORS.Exam_ID_MISSING });
    const results = await db.getResultForExam(req.params.examId);
    if (!results) return res.status(404).send({ error: ERRORS.Exam_Not_Found});
    res.status(200).send(results);
}