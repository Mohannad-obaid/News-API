import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Category {
  @Prop({
    required: true,
    minlength: 3,
    maxlength: 15,
    trim: true,
    unique: [true, 'Category name must be unique'],
  })
  name: string;

  @Prop({ default: null })
  description?: string;

  @Prop({ default: 'default.png' })
  image?: string;

  @Prop({ default: true })
  isActive?: boolean;
}

export const CategoriesSchema = SchemaFactory.createForClass(Category);
