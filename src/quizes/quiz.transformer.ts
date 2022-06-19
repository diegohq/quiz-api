import { Injectable } from '@nestjs/common';
import { Question } from './schemas/question.schema';
import { QuizDocument } from './schemas/quiz.schema';

@Injectable()
export default class QuizTransformer {
  public transform(quiz: QuizDocument) {
    return {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions.map((question: Question) => {
        return {
          question: question.question,
          options: question.options,
          correctKeyOption: question.correctKeyOption
        }
      })
    };
  }
}
