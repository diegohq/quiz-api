import { Module } from '@nestjs/common';
import { QuizesModule } from './quizes/quizes.module';

@Module({
  imports: [QuizesModule],
})
export class AppModule {}
