import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Question } from './question.schema';

export type QuizDocument = Quiz & Document;

@Schema({collection: 'quizes'})
export class Quiz {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Questions' }] })
  questions: Question[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);