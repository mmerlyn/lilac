import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type MOrderDocument = HydratedDocument<MOrder>;

@Schema({ collection: 'm_order', timestamps: true, versionKey: false })
export class MOrder {
  @Prop()
  userId: ObjectId;

  @Prop()
  products: Array<object>;

  @Prop()
  addressId: ObjectId;

  @Prop()
  status: string;

  @Prop()
  deliveryEstimate: Date;

  @Prop()
  paymentId: ObjectId;
}

export const MOrderSchema = SchemaFactory.createForClass(MOrder);
