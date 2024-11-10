import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { MONGO_CONNECTION } from 'src/consts/product.consts';
import { MUserHistory } from 'src/models/m_userhistory.schema';

@Injectable()
export class UserHistoryDao {
  constructor(
    @InjectModel(MUserHistory.name, MONGO_CONNECTION)
    private readonly model: Model<MUserHistory>,
  ) {}

  async listIds(userId: ObjectId): Promise<Array<ObjectId>> {
    try {
      const data = await this.model.findOne({ userId });
      if (data === null) {
        throw new Error('Product not found!');
      }
      return data.productIds;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createDoc(userId: ObjectId) {
    try {
      await this.model.insertMany([{ userId: userId, productIds: [] }]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addToUserHistory(userId: ObjectId, productId: ObjectId) {
    try {
      const doc = await this.model.findOne({ userId: userId });
      if (doc === null) {
        await this.createDoc(userId);
      }
      await this.model.updateOne(
        { userId: userId },
        { $addToSet: { productIds: productId } },
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async historyList(userId: ObjectId, page: number, size: number) {
    try {
      const data = await this.model.aggregate([
        {
          $match: {
            userId: userId,
          },
        },
        {
          $lookup: {
            from: 'm_products',
            let: {
              ids: '$productIds',
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$_id', '$$ids'],
                  },
                },
              },
            ],
            as: 'productInfo',
          },
        },
        {
          $project: {
            productIds: 0,
            userId: 0,
            _id: 0,
            createdAt: 0,
            updatedAt: 0,
          },
        },
        {
          $unwind: '$productInfo',
        },
        {
          $replaceRoot: {
            newRoot: '$productInfo',
          },
        },
        {
          $facet: {
            productList: [
              {
                $skip: page * size,
              },
              {
                $limit: size,
              },
            ],
            total: [
              {
                $count: 'count',
              },
            ],
          },
        },
        {
          $unwind: '$total',
        },
      ]);
      if (data.length === 0) {
        throw new Error('No history found!');
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
