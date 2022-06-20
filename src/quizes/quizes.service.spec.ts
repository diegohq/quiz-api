import { Test, TestingModule } from '@nestjs/testing';
import { QuizesService } from './quizes.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { Question, QuestionSchema } from './schemas/question.schema';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

describe('QuizesService', () => {
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let quizesService: QuizesService;
  let quizModel: Model<Quiz>;
  let questionModel: Model<Question>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create({
      binary: {
        downloadDir: '/.cache/mongodb-binaries'
      }
    });
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    quizModel = mongoConnection.model(Quiz.name, QuizSchema);
    questionModel = mongoConnection.model(Question.name, QuestionSchema);
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: () => ({
            uri: mongod.getUri(),
          }),
        }),
      ],
      providers: [
        QuizesService,
        {provide: getModelToken(Quiz.name), useValue: quizModel},
        {provide: getModelToken(Question.name), useValue: questionModel},
      ],
    }).compile();
    quizesService = app.get<QuizesService>(QuizesService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('create', () => {
    it('should store Dto information', async () => {
      const quizCreated = await quizesService.create({
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

      expect(quizCreated.title).toBe('This is the title');
      expect(quizCreated.questions).toHaveLength(2);
      expect(quizCreated.questions[0].correctKeyOption).toBe(1);
      expect(quizCreated.questions[0].options).toHaveLength(3);
      expect(quizCreated.questions[1].correctKeyOption).toBe(0);
      expect(quizCreated.questions[1].options).toHaveLength(3);
    });
  });
});
