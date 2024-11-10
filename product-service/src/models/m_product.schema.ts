import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

export type MProductDocument = HydratedDocument<MProduct>;

@Schema({ collection: 'm_products', timestamps: true, versionKey: false })
export class MProduct {
  @Prop()
  title: string;

  @Prop()
  listPrice: number;

  @Prop()
  imageUrl: Array<string>;

  @Prop()
  description: string;

  @Prop()
  categoryId: ObjectId;
  @Prop()
  subCategoryId: ObjectId;

  @Prop()
  brand: string;

  @Prop()
  discount: number;

  @Prop()
  sku: string;

  @Prop()
  specifications: Array<any>;
}

export const MProductSchema = SchemaFactory.createForClass(MProduct);
