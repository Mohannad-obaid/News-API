import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true })
export class News {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, trim: true })
  content: string;

  @Prop({ trim: true })
  summary?: string;

  @Prop({ default: null })
  image?: string;

  @Prop({
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Types.ObjectId;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ type: Number, default: 0 })
  views: number;
}

export const NewsSchema = SchemaFactory.createForClass(News);
