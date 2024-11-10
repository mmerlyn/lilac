import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type MCartDocument = HydratedDocument<MCart>;

@Schema({ collection: 'm_cart', timestamps: true, versionKey: false })
export class MCart {
  @Prop()
  userId: ObjectId;

  @Prop()
  products: Array<CartItem>;
}

export class CartItem {
  @Prop()
  productId: ObjectId;

  @Prop()
  quantity: number;
}

export const MCartSchema = SchemaFactory.createForClass(MCart);
