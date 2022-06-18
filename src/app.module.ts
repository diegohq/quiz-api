import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizesModule } from './quizes/quizes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:secret@mongo:27017/'),
    QuizesModule
  ],
})
export class AppModule {}
