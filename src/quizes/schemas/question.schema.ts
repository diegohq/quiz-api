import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop()
  question: string;

  @Prop()
  options: string[];

  @Prop()
  correctKeyOption: number
}

export const QuestionSchema = SchemaFactory.createForClass(Question);