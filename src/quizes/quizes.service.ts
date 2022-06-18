import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { Quiz, QuizDocument } from './schemas/quiz.schema';

@Injectable()
export class QuizesService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  async create(createQuizDto: CreateQuizDto): Promise<QuizDocument> {
    const createdQuiz = new this.quizModel(createQuizDto);
    return await createdQuiz.save();
  }

  async find(id: string): Promise<QuizDocument> {
    return await this.quizModel.findById(id).exec();
  }
}
