import { Exam } from '../../shared/types';

export interface ExamDao {
  CreateExam: (exam: Exam) => Promise<void>;
  getExamById: (id: string) => Promise<Exam | undefined>;
  // deleteExamById: (id: string) => Promise<Exam>;
}
