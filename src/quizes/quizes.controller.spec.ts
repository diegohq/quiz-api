import { Test } from '@nestjs/testing';
import QuizTransformer from './quiz.transformer';
import { QuizesController } from './quizes.controller';
import { QuizesService } from './quizes.service';

const mockQuizesService = () => ({
  create: jest.fn(),
  find: jest.fn(),
});

const mockQuizTransformer = () => ({
  transform: jest.fn(),
});

let quizesController: QuizesController;
let quizesService: QuizesService;
let quizTransformer: QuizTransformer;

describe('QuizesController', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [QuizesController],
      providers: [
        { provide: QuizesService, useFactory: mockQuizesService },
        { provide: QuizTransformer, useFactory: mockQuizTransformer },
      ],
    }).compile();

    quizesController = module.get<QuizesController>(QuizesController);
    quizesService = module.get<QuizesService>(QuizesService);
    quizTransformer = module.get<QuizTransformer>(QuizTransformer);
  });

  describe('store', () => {
    it('should store quiz data', async () => {
      await quizesController.store({
        title: 'This is the title',
        description: 'This is the description',
        questions: [
          {
            question: 'Question 1',
            options: ['Option One', 'Option Two', 'Option Three'],
            correctKeyOption: 1,
          },
          {
            question: 'Question 2',
            options: ['Option Four', 'Option Five', 'Option Six'],
            correctKeyOption: 0,
          },
        ],
      });

      expect(quizesService.create).toBeCalledTimes(1);
      expect(quizTransformer.transform).toBeCalledTimes(1);
    });
  });

  describe('find', () => {
    it('should find data', async () => {
      await quizesController.find('12');

      expect(quizesService.find).toBeCalledTimes(1);
      expect(quizesService.find).toBeCalledWith('12');
      expect(quizTransformer.transform).toBeCalledTimes(1);
    });
  });
});
