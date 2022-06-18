import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop()
  question: string;

  @Prop([String])
  options: string[];

  @Prop()
  rightOption: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
