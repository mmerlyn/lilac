import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';
export type MStockDocument = HydratedDocument<MStock>;

@Schema({ collection: 'm_stock', timestamps: true, versionKey: false })
export class MStock {
  @Prop()
  productId: ObjectId;

  @Prop()
  stock: number;
}

export const MStockSchema = SchemaFactory.createForClass(MStock);
