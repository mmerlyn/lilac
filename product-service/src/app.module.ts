import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from 'src/controller/product.controller';
import { ProductDao } from 'src/database/product.dao';
import { MCategory, MCategorySchema } from 'src/models/m_category.schema';
import { MProduct, MProductSchema } from 'src/models/m_product.schema';
import { MRating, MRatingSchema } from 'src/models/m_rating.schema';
import { MStock, MStockSchema } from 'src/models/m_stock.schema';
import {
  MUserHistory,
  MUserHistorySchema,
} from 'src/models/m_userhistory.schema';
import { MWishlist, MWishlistSchema } from 'src/models/m_wishlist.schema';
import { ProductService } from 'src/services/product.service';
import { MONGO_CONNECTION } from './consts/product.consts';
import { ConfigModule } from '@nestjs/config';
import { UserHistoryDao } from './database/userhistory.dao';
import { BannerDao } from './database/banner.dao';
import { MBanner, MBannerSchema } from './models/m_banner.schema';
import { WishlistDao } from './database/wishlist.dao';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.CONFIG_DIR.trim()}/${process.env.ENVIRONMENT.trim()}.env`,
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
        { name: MCategory.name, schema: MCategorySchema },
        { name: MProduct.name, schema: MProductSchema },
        { name: MStock.name, schema: MStockSchema },
        { name: MUserHistory.name, schema: MUserHistorySchema },
        { name: MWishlist.name, schema: MWishlistSchema },
        { name: MRating.name, schema: MRatingSchema },
        { name: MBanner.name, schema: MBannerSchema },
      ],
      MONGO_CONNECTION,
    ),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductDao,
    UserHistoryDao,
    BannerDao,
    WishlistDao,
  ],
})
export class AppModule {}
