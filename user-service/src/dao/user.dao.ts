import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { MONGO_CONNECTION } from 'src/consts/user.conts';
import { MUser } from 'src/models/m_user.model';

@Injectable()
export class UserDao {
  constructor(
    @InjectModel(MUser.name, MONGO_CONNECTION)
    private readonly model: Model<MUser>,
  ) {}

  async createDocument(document: MUser): Promise<string> {
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

  async getProfile(userId: ObjectId) {
    try {
      const data = await this.model.aggregate([
        {
          $match: {
            _id: userId,
          },
        },
        {
          $lookup: {
            from: 'm_user_data',
            localField: '_id',
            foreignField: 'userId',
            as: 'result',
          },
        },
        {
          $unwind: '$result',
        },
      ]);

      if (data.length === 0) {
        throw new Error('Document not found!');
      }
      return data[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async isUserExists(email: string) {
    try {
      const document = await this.model.findOne({ email: email });

      if (document != null) {
        throw new Error('User already exists');
      } else {
        return true;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
