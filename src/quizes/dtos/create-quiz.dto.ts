import { IsNotEmpty } from 'class-validator';
import CreateQuestionDto from './create-question.dto';

export class CreateQuizDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  questions: CreateQuestionDto[]
}
