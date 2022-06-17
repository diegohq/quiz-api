import { Module } from '@nestjs/common';
import { QuizesController } from './quizes.controller';

@Module({
  controllers: [QuizesController]
})
export class QuizesModule {}
