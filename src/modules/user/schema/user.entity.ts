import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    required: true,
    minlength: [6, 'TOOl short password '],
    maxlength: 20,
  })
  password: string;

  @Prop({ default: 'user', enum: ['user', 'editor', 'admin'] })
  role: string;

  @Prop()
  passwordChangedAt: Date;

  @Prop()
  passwordResetCode: string;

  @Prop()
  passwordResetExpire: Date;

  @Prop()
  passwordResetVerified: boolean;

  @Prop()
  confirmAccountCode: string;

  @Prop()
  confirmAccountExpire: Date;

  @Prop({ default: false })
  accountVerification: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
