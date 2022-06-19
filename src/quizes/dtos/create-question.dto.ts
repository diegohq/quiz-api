import { IsNotEmpty } from "class-validator";

export default class CreateQuestionDto {
    @IsNotEmpty()
    question: string;

    @IsNotEmpty()
    options: string[];

    @IsNotEmpty()
    correctKeyOption: number;
}