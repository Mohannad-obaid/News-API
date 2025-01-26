import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, minlength: 3, maxlength: 15 })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    required: true,
    minlength: [6, 'TOOl short password '],
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

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Hash password
  this.password = await bcrypt.hash(this.password, 13);
  next();
});

export default UserSchema;
