import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { MONGO_CONNECTION } from 'src/consts/order.consts';
import { MCart } from 'src/models/m_cart.schema';

@Injectable()
export class CartDao {
  constructor(
    @InjectModel(MCart.name, MONGO_CONNECTION)
    private readonly model: Model<MCart>,
  ) {}

  async createDoc(userId: ObjectId) {
    try {
      await this.model.insertMany([{ userId: userId, products: [] }]);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addItemToCart(userId: ObjectId, productId: ObjectId, quantity: number) {
    try {
      const doc = await this.model.findOne({ userId: userId });
      if (doc == null) {
        await this.createDoc(userId);
      }

      const exists = await this.model.findOne({
        userId: userId,
        'products.productId': productId,
      });
      if (exists === null) {
        await this.model.updateOne(
          {
            userId: userId,
          },
          {
            $addToSet: { products: { productId, quantity } },
          },
        );
      } else {
        await this.model.updateOne(
          { userId: userId, 'products.productId': productId },
          { $inc: { 'products.$.quantity': quantity } },
        );
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteItemFromCart(userId: ObjectId, productId: ObjectId) {
    try {
      const doc = await this.model.findOne({ userId: userId });
      if (doc === null) {
        throw new Error("Doc doesn't exist");
      }

      await this.model.updateMany(
        { userId: userId },
        { $pull: { products: { productId: productId } } },
      );
    } catch (error) {
      throw new error(error.message);
    }
  }

  async getCartItem(userId: ObjectId) {
    try {
      const list = await this.model.findOne({ userId });
      if (list === null) return [];
      return list.products;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
