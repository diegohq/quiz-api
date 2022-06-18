import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import QuizTransformer from './quiz.transformer';
import { QuizesService } from './quizes.service';

@Controller('quizes')
export class QuizesController {
  constructor(
    private quizesService: QuizesService,
    private quizTransformer: QuizTransformer,
  ) {}

  @Get('/:id')
  async find(@Param('id') id: string) {
    return this.quizTransformer.transform(await this.quizesService.find(id));
  }

  @Post()
  async store(@Body() createQuizDto: CreateQuizDto) {
    return this.quizTransformer.transform(
      await this.quizesService.create(createQuizDto),
    );
  }
}
