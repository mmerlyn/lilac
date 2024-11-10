import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type MWishlistDocument = HydratedDocument<MWishlist>;

@Schema({ collection: 'm_wishlist', timestamps: true, versionKey: false })
export class MWishlist {
  @Prop({ required: true })
  userId: ObjectId;

  @Prop({ required: true })
  productIds: Array<ObjectId>;
}

export const MWishlistSchema = SchemaFactory.createForClass(MWishlist);
