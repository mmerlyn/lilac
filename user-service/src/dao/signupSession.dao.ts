import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { MONGO_CONNECTION } from 'src/consts/user.conts';
import { MSignupSession } from 'src/models/m_signup_session.model';

@Injectable()
export class SignupSessionDao {
  constructor(
    @InjectModel(MSignupSession.name, MONGO_CONNECTION)
    private readonly model: Model<MSignupSession>,
  ) {}

  async createDocument(document: MSignupSession): Promise<any> {
    try {
      const ack = await this.model.insertMany([document]);
      if (ack == null) {
        throw new Error('Mongodb Insertion error');
      }
      return ack;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async readSession(sessionId: ObjectId) {
    try {
      const doc = await this.model.findOne({ _id: sessionId });
      if (doc == null) {
        throw new Error('Document Not Found!');
      }
      return doc;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateSession(sessionId: ObjectId) {
    try {
      const doc = await this.model.updateOne(
        { _id: sessionId },
        { $set: { verified: true } },
      );
      if (doc == null) {
        throw new Error('Document Not Found!');
      }
      return doc;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
