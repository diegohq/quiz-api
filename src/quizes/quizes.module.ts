import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizesController } from './quizes.controller';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { QuizesService } from './quizes.service';
import QuizTransformer from './quiz.transformer';
import { Question, QuestionSchema } from './schemas/question.schema';

@Module({
  controllers: [QuizesController],
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  providers: [QuizesService, QuizTransformer],
})
export class QuizesModule {}
