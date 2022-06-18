import { Injectable } from '@nestjs/common';
import { Quiz, QuizDocument } from './schemas/quiz.schema';

@Injectable()
export default class QuizTransformer {
  public transform(quiz: QuizDocument) {
    return {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
    };
  }
}
