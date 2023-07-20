import { Exam } from '../../shared/types';

export interface ExamDao {
  CreateExam: (exam: Exam) => Promise<void>;
  getExamById: (id: string) => Promise<Exam | undefined>;
  deleteExam: (id: string) => Promise<void>;
  getAllexams: () => Promise<Exam[]>;
}
