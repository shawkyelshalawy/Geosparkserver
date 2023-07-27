import {Result} from "../../shared/types";

export  interface ResultsDao {
    insertResult: (result: Result) => Promise<void>;
    getResultsForaUser: (userId: string) => Promise<Result[]>;
    getResultForExam: (examId: string) => Promise<Result[]>;
}