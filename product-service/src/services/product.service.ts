import { Injectable, Logger } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { BannerDao } from 'src/database/banner.dao';
import { ProductDao } from 'src/database/product.dao';
import { UserHistoryDao } from 'src/database/userhistory.dao';
import { WishlistDao } from 'src/database/wishlist.dao';
import {
  APIResponseDTO,
  PageInfo,
  PaginatedAPIResponseDTO,
} from 'src/dto/common.dto';
import {
  GRPCProductInfoRequest,
  wishlistRequestDTO,
} from 'src/dto/request.dto';
import {
  GRPCProductInfoResponseDTO,
  ProductInfoDTO,
  ProductListInfoDTO,
  wishlistResponseDTO,
} from 'src/dto/response.dto';

@Injectable()
export class ProductService {
  logger = new Logger(ProductService.name);
  constructor(
    private readonly productDao: ProductDao,
    private readonly userHistoryDao: UserHistoryDao,
    private readonly bannerDao: BannerDao,
    private readonly wishlistDao: WishlistDao,
  ) {}

  async getBanner() {
    const response = new PaginatedAPIResponseDTO<string>();
    try {
      const ids = await this.bannerDao.fetchBannerIds();

      response.payload = ids.map((id) => {
        return `${process.env.STATIC_IMAGE_URL}/banner/${id}.jpg`;
      });

      return response;
    } catch (error) {
      response.status.setError(error.message);
      return response;
    }
  }

  async addItemToWishlist(request: wishlistRequestDTO) {
    const response = new APIResponseDTO<wishlistResponseDTO>();

    try {
      await this.wishlistDao.addItem(
        new ObjectId(request.userId),
        new ObjectId(request.productId),
      );

      response.payload = new wishlistResponseDTO(true);
      return response;
    } catch (error) {
      response.status.setError(error.message);
      return response;
    }
  }

  async deleteFromWishlist(request: wishlistRequestDTO) {
    const response = new APIResponseDTO<wishlistResponseDTO>();
    try {
      await this.wishlistDao.deleteItem(
        new ObjectId(request.userId),
        new ObjectId(request.productId),
      );

      response.payload = new wishlistResponseDTO(true);
      return response;
    } catch (error) {
      response.status.setError(error.message);
      return response;
    }
  }

  async getWishlist(userId: string, page: number, size: number) {
    const response = new PaginatedAPIResponseDTO<ProductListInfoDTO>();
    try {
      const list = await this.wishlistDao.wishList(
        new ObjectId(userId),
        page,
        size,
      );
      response.payload = list[0].productList.map((item) => {
        return new ProductListInfoDTO(
          item._id,
          item.title,
          item.listPrice,
          item.discount,
          item.imageUrl,
          item.categoryId,
          item.subCategoryId,
          item.brand,
        );
      });

      response.pageInfo = new PageInfo(page, size, list[0].total.count);
      return response;
    } catch (error) {
      response.status.setError(error.message);
      return response;
    }
  }

  async getSearchList(title: string, page: number, size: number) {
    const response = new PaginatedAPIResponseDTO<ProductListInfoDTO>();
    try {
      const data = await this.productDao.searchProducts(title, page, size);
      response.payload = data.productList.map((item) => {
        return new ProductListInfoDTO(
          item._id,
          item.title,
          item.listPrice,
          item.discount,
          item.imageUrl,
          item.categoryId,
          item.subCategoryId,
          item.brand,
        );
      });
      response.pageInfo = new PageInfo(page, size, data.total.count);
      return response;
    } catch (error) {
      response.status.setError(error.message);
      return response;
    }
  }

  async getProductInfo(userId: string, productId: string) {
    const response = new APIResponseDTO<ProductInfoDTO>();
    try {
      /** Get data from database */
      const data = await this.productDao.findProduct(new ObjectId(productId));

      if (userId != '0') {
        await this.userHistoryDao.addToUserHistory(
          new ObjectId(userId),
          new ObjectId(productId),
        );
      }

      /** format the data */
      response.payload = new ProductInfoDTO(
        data._id,
        data.title,
        data.listPrice,
        data.discount,
        data.imageUrl,
        data.description,
        data.categoryId,
        data.subCategoryId,
        data.brand,
        data.sku,
        data.specifications,
      );

      this.logger.log(
        `product info fetch complete for productId: ${productId}`,
      );

      /** send data */
      return response;
    } catch (error) {
      this.logger.error(
        `product info fetch failed for productId: ${productId} error:${error.message}`,
      );
      response.status.setError(error.message);
      return response;
    }
  }

  async getHistoryList(userId: string, page: number, size: number) {
    const response = new PaginatedAPIResponseDTO<ProductListInfoDTO>();
    try {
      const list = await this.userHistoryDao.historyList(
        new ObjectId(userId),
        page,
        size,
      );
      response.payload = list[0].productList.map((item) => {
        return new ProductListInfoDTO(
          item._id,
          item.title,
          item.listPrice,
          item.discount,
          item.imageUrl,
          item.categoryId,
          item.subCategoryId,
          item.brand,
        );
      });

      response.pageInfo = new PageInfo(page, size, list[0].total.count);
      return response;
    } catch (error) {
      response.status.setError(error.message);
      return response;
    }
  }

  async getSimilarInfo(productId: string) {
    //
  }

  async getFilterlist(query: string) {
    //
  }

  async getProductFromIds(request: GRPCProductInfoRequest) {
    const response = new GRPCProductInfoResponseDTO();
    try {
      const productIds = request.productIds.map((item) => new ObjectId(item));
      const data = await this.productDao.findProductList(productIds);

      response.productList = data.map(
        (item) =>
          new ProductListInfoDTO(
            item._id,
            item.title,
            item.listPrice,
            item.discount,
            item.imageUrl,
            item.categoryId,
            item.subCategoryId,
            item.brand,
          ),
      );
      response.status = true;
      return response;
    } catch (error) {
      this.logger.error(`ProductList fetch failed :${error.message}`);
      response.productList = [];
      response.status = false;
      return response;
    }
  }
}
