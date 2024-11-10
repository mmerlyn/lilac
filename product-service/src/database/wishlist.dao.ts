import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { MONGO_CONNECTION } from 'src/consts/product.consts';
import { MWishlist } from 'src/models/m_wishlist.schema';

@Injectable()
export class WishlistDao {
  constructor(
    @InjectModel(MWishlist.name, MONGO_CONNECTION)
    private readonly model: Model<MWishlist>,
  ) {}

  async addItem(userId: ObjectId, productId: ObjectId) {
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

  async createDoc(userId: ObjectId) {
    try {
      await this.model.insertMany([{ userId: userId, productIds: [] }]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteItem(userId: ObjectId, productId: ObjectId) {
    try {
      const doc = await this.model.findOne({ userId: userId });
      if (doc === null) {
        throw new Error("Doc doesn't exist");
      }

      await this.model.updateMany(
        { userId: userId },
        { $pull: { productIds: productId } },
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // async listIds(userId: ObjectId) {
  //   try {
  //     const user = await this.model.findOne({ userId });
  //     if (user === null) {
  //       throw new Error('User not found!');
  //     }
  //     return user.productIds;
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  async wishList(userId: ObjectId, page: number, size: number) {
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
        throw new Error('No products in wishlist');
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
