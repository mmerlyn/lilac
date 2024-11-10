import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MUserDocument = HydratedDocument<MUser>;

@Schema({ collection: 'm_user', timestamps: true, versionKey: false })
export class MUser {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(MUser);
