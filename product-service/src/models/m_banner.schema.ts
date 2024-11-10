import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MBannerDocument = HydratedDocument<MBanner>;

@Schema({ collection: 'm_banner', timestamps: true, versionKey: false })
export class MBanner {
  @Prop()
  url: Array<string>;
}

export const MBannerSchema = SchemaFactory.createForClass(MBanner);
