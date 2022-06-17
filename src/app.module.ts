import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizesModule } from './quizes/quizes.module';

@Module({
  imports: [QuizesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
