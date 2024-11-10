import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MONGO_CONNECTION } from 'src/consts/order.consts';
import { MOrder } from 'src/models/m_order.schema';

@Injectable()
export class OrderDao {
  constructor(
    @InjectModel(MOrder.name, MONGO_CONNECTION)
    private readonly model: Model<MOrder>,
  ) {}
}
