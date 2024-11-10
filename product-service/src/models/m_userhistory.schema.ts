import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type MUserHistoryDocument = HydratedDocument<MUserHistory>;

@Schema({ collection: 'm_userhistory', timestamps: true, versionKey: false })
export class MUserHistory {
  @Prop()
  userId: ObjectId;

  @Prop()
  productIds: Array<ObjectId>;
}

export const MUserHistorySchema = SchemaFactory.createForClass(MUserHistory);
