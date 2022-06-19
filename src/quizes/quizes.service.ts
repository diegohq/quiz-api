import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateQuestionDto from './dtos/create-question.dto';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { Question, QuestionDocument } from './schemas/question.schema';
import { Quiz, QuizDocument } from './schemas/quiz.schema';

@Injectable()
export class QuizesService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async create(createQuizDto: CreateQuizDto): Promise<QuizDocument> {
    const createdQuiz = new this.quizModel({
      title: createQuizDto.title,
      description: createQuizDto.description,
      questions: createQuizDto.questions.map(
        (createQuestionDto: CreateQuestionDto) => {
          return new this.questionModel({
            question: createQuestionDto.question,
            options: createQuestionDto.options,
            correctKeyOption: createQuestionDto.correctKeyOption,
          });
        },
      ),
    });

    return await createdQuiz.save();
  }

  async find(id: string): Promise<QuizDocument> {
    return await this.quizModel.findById(id).populate('questions').exec();
  }
}
