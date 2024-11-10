import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MSignupSessionDoc = HydratedDocument<MSignupSession>;

@Schema({ collection: 'm_signup_session', timestamps: true, versionKey: false })
export class MSignupSession {
  @Prop()
  email: string;

  @Prop()
  otp: number;

  @Prop()
  verified: boolean;
}

export const SignupSessionSchema = SchemaFactory.createForClass(MSignupSession);
