import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type MRatingDocument = HydratedDocument<MRating>;

@Schema({ collection: 'm_rating', timestamps: true, versionKey: false })
export class MRating {
  @Prop()
  productId: ObjectId;

  @Prop()
  rating: number;
}

export const MRatingSchema = SchemaFactory.createForClass(MRating);
