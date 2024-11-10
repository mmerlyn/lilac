import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { MONGO_CONNECTION } from 'src/consts/user.conts';
import { MUserData } from 'src/models/m_user_data.model';

@Injectable()
export class UserDataDao {
  constructor(
    @InjectModel(MUserData.name, MONGO_CONNECTION)
    private readonly model: Model<MUserData>,
  ) {}

  async createDocument(document: MUserData): Promise<string> {
    try {
      const data = await this.model.insertMany([document]);
      if (data == null) {
        throw new Error('Mongodb insertion error');
      }
      return data[0]._id.toString();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
