import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type MUserDataDocument = HydratedDocument<MUserData>;

@Schema({ collection: 'm_user_data', timestamps: true, versionKey: false })
export class MUserData {
  @Prop()
  userId: ObjectId;

  @Prop()
  address: Array<object>;
}

export const UserDataSchema = SchemaFactory.createForClass(MUserData);
