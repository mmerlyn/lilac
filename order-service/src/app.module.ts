import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './consts/order.consts';
import { MOrder, MOrderSchema } from './models/m_order.schema';
import { MCart, MCartSchema } from './models/m_cart.schema';
import { MTracking, MTrackingSchema } from './models/m_tracking.schema';
import { OrderController } from './controllers/order.controller';
import { CartDao } from './dao/cart.dao';
import { OrderDao } from './dao/order.dao';
import { TrackingDao } from './dao/tracking.dao';
import { OrderService } from './services/order.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProductGrpcService } from './services/grpc/product.grpc.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.CONFIG_DIR?.trim()}/${process.env.ENVIRONMENT?.trim()}.env`,
    }),
    MongooseModule.forRootAsync({
      connectionName: MONGO_CONNECTION,
      useFactory: async () => {
        const MONGO_USERNAME = process.env.MONGO_USERNAME;
        const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
        const MONGO_HOST = process.env.MONGO_HOST;
        const MONGO_DATABASE = process.env.MONGO_DATABASE;
        const URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`;
        return {
          uri: URI,
        };
      },
    }),
    MongooseModule.forFeature(
      [
        { name: MCart.name, schema: MCartSchema },
        { name: MOrder.name, schema: MOrderSchema },
        { name: MTracking.name, schema: MTrackingSchema },
      ],
      MONGO_CONNECTION,
    ),
    ClientsModule.register([
      {
        name: 'ProductGRPC',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: join(__dirname, 'proto/product.service.proto'),
          url: process.env.PRODUCT_GRPC,
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, CartDao, OrderDao, TrackingDao, ProductGrpcService],
})
export class AppModule {}
