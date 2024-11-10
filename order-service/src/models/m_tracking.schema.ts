import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type MTrackingDocument = HydratedDocument<MTracking>;

@Schema({ collection: 'm_tracking', timestamps: true, versionKey: false })
export class MTracking {
  @Prop()
  orderId: ObjectId;

  @Prop()
  trackingLog: Array<object>;
}

export const MTrackingSchema = SchemaFactory.createForClass(MTracking);
