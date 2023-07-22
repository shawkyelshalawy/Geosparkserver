import { Question } from '../../shared/types';

export interface questionsDao {
  AddQuestion: (question: Question) => Promise<void>;
  getQuestionById: (id: string) => Promise<Question | undefined>;
  getExamQuestions: (examId: string) => Promise<Question[]>;
}
