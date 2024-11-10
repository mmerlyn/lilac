import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MONGO_CONNECTION } from 'src/consts/product.consts';
import { MBanner } from 'src/models/m_banner.schema';

@Injectable()
export class BannerDao {
  constructor(
    @InjectModel(MBanner.name, MONGO_CONNECTION)
    private readonly model: Model<MBanner>,
  ) {}

  async fetchBannerIds(): Promise<Array<string>> {
    try {
      const data = await this.model.findOne({});
      if (data == null) {
        throw new Error('Banner not found');
      }
      return data.url;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
