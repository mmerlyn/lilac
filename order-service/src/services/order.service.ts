import { Injectable, Logger } from '@nestjs/common';
import { CartDao } from 'src/dao/cart.dao';
import { OrderDao } from 'src/dao/order.dao';
import { TrackingDao } from 'src/dao/tracking.dao';
import { APIResponseDTO } from 'src/dto/common.dto';
import { CartRequestDTO, deleteRequestDTO } from 'src/dto/request.dto';
import {
  CartItemResponseDTO,
  CartListResponse,
  CartResponseDTO,
} from 'src/dto/response.dto';
import { ObjectId } from 'mongodb';
import { ProductGrpcService } from './grpc/product.grpc.service';

@Injectable()
export class OrderService {
  logger = new Logger(OrderService.name);
  constructor(
    private readonly cartDao: CartDao,
    private readonly orderDao: OrderDao,
    private readonly trackingDao: TrackingDao,
    private readonly productGRPCSerivce: ProductGrpcService,
  ) {}

  async addToCart(request: CartRequestDTO) {
    const response = new APIResponseDTO<CartResponseDTO>();
    try {
      await this.cartDao.addItemToCart(
        new ObjectId(request.userId),
        new ObjectId(request.productId),
        request.quantity,
      );

      response.payload = new CartResponseDTO(true);
      return response;
    } catch (error) {
      response.status.setError(error.message);
      return response;
    }
  }

  async deleteFromCart(request: deleteRequestDTO) {
    const response = new APIResponseDTO<CartResponseDTO>();
    try {
      await this.cartDao.deleteItemFromCart(
        new ObjectId(request.userId),
        new ObjectId(request.productId),
      );

      response.payload = new CartResponseDTO(true);
      return response;
    } catch (error) {
      response.status.setError(error.message);
      return response;
    }
  }

  async getCartItems(userId: string) {
    const response = new APIResponseDTO<CartListResponse>();
    response.payload = new CartListResponse();
    try {
      const productList = await this.cartDao.getCartItem(new ObjectId(userId));
      const productMap = new Map<string, number>();
      const productIds = productList.map((item) => {
        productMap.set(item.productId.toString(), item.quantity);
        return item.productId.toString();
      });
      let totalPrice = 0;
      let totalDiscount = 0;

      const productInfoList = await this.productGRPCSerivce.GetProductInfo({
        productIds,
      });
      response.payload.productList = productInfoList.map((item) => {
        totalPrice += item.listPrice * productMap.get(item.productId)!;
        totalDiscount += item.discount * productMap.get(item.productId)!;
        return new CartItemResponseDTO(
          item.productId,
          item.title,
          item.listPrice,
          item.discount,
          item.imageUrl,
          item.categoryId,
          item.subCategoryId,
          item.brand,
          productMap.get(item.productId)!,
        );
      });
      response.payload.totalPrice = totalPrice;
      response.payload.totalDiscount = totalDiscount;
      return response;
    } catch (error) {
      response.status.setError(error.message);
      return response;
    }
  }
}
