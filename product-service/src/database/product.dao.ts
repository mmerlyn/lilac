import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { MProduct } from 'src/models/m_product.schema';
import { MONGO_CONNECTION } from 'src/consts/product.consts';

@Injectable()
export class ProductDao {
  constructor(
    @InjectModel(MProduct.name, MONGO_CONNECTION)
    private readonly model: Model<MProduct>,
  ) {}

  async findProduct(productId: ObjectId) {
    try {
      const data = await this.model.findOne({ _id: productId });
      if (data == null) {
        throw new Error('Product not found');
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  generateRegex(title: string) {
    // Escape special characters in the title
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Split the title into words
    const words = escapedTitle.split(' ');

    // Create a regex pattern for each word
    const wordPatterns = words.map((word) => `(?=.*\\b${word}\\b)`);

    // Combine the word patterns into a single regex
    const regexPattern = new RegExp(wordPatterns.join(''), 'i');

    return regexPattern;
  }

  async searchProducts(title: string, page: number, size: number) {
    try {
      const data = await this.model.aggregate([
        {
          $match: {
            title: {
              $regex: this.generateRegex(title),
            },
          },
        },
        {
          $project: {
            title: 1,
            listPrice: 1,
            discount: 1,
            imageUrl: 1,
            categoryId: 1,
            subCategoryId: 1,
            brand: 1,
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
      return data[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findProductList(productIds: Array<ObjectId>) {
    try {
      const productList = await this.model.find(
        { _id: { $in: productIds } },
        { specifications: 0 },
      );
      return productList;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // async filterProducts() {}

  // async productInfo() {}

  // async similarInfo() {}
}
