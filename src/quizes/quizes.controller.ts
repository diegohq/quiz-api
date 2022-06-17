import { Controller, Get } from '@nestjs/common';

@Controller('quizes')
export class QuizesController {

    @Get()
    store() {
        return 'ok';
    }


}
