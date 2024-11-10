import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MONGO_CONNECTION } from 'src/consts/product.consts';
import { MCategory } from 'src/models/m_category.schema';

@Injectable()
export class RatingDao {
  constructor(
    @InjectModel(MCategory.name, MONGO_CONNECTION)
    private readonly model: Model<MCategory>,
  ) {}

  async findRating() {
    try {
    } catch (error) {}
  }
}
