import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MONGO_CONNECTION } from 'src/consts/order.consts';
import { MTracking } from 'src/models/m_tracking.schema';

@Injectable()
export class TrackingDao {
  constructor(
    @InjectModel(MTracking.name, MONGO_CONNECTION)
    private readonly model: Model<MTracking>,
  ) {}
}
