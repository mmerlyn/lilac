import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MCategoryDocument = HydratedDocument<MCategory>;

@Schema()
export class MCategory {
  @Prop({ collection: 'm_category', timestamps: true, versionKey: false })
  categoryName: string;

  @Prop()
  type: string;
}

export const MCategorySchema = SchemaFactory.createForClass(MCategory);
