import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MONGO_CONNECTION } from 'src/consts/product.consts';
import { MRating } from 'src/models/m_rating.schema';

@Injectable()
export class RatingDao {
  constructor(
    @InjectModel(MRating.name, MONGO_CONNECTION)
    private readonly model: Model<MRating>,
  ) {}

  async findRating() {
    try {
    } catch (error) {}
  }
}
