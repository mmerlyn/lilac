import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GRPCProductInfoRequest,
  wishlistRequestDTO,
} from 'src/dto/request.dto';
import { ProductService } from 'src/services/product.service';

@Controller('/product')
export class ProductController {
  constructor(readonly productService: ProductService) {}

  @Get('/banner')
  async banner() {
    const data = await this.productService.getBanner();
    return data;
  }

  @Post('/wishlist/add')
  async addingToWishlist(@Body() request: wishlistRequestDTO) {
    const data = await this.productService.addItemToWishlist(request);
    return data;
  }

  @Delete('/wishlist')
  async deleteFromWishlist(@Body() request: wishlistRequestDTO) {
    const data = await this.productService.deleteFromWishlist(request);
    return data;
  }

  @Get('/wishlist/:userId')
  async wishlist(
    @Param('userId') userId: string,
    @Query('page') page: string,
    @Query('size') size: string,
  ) {
    const data = await this.productService.getWishlist(
      userId,
      parseInt(page),
      parseInt(size),
    );
    return data;
  }

  @Get('/search')
  async searchList(
    @Query('title') title: string,
    @Query('page') page: string,
    @Query('size') size: string,
  ) {
    const data = await this.productService.getSearchList(
      title,
      parseInt(page),
      parseInt(size),
    );
    return data;
  }

  @Get('/info/:userId/:productId')
  async productInfo(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    const data = await this.productService.getProductInfo(userId, productId);
    return data;
  }

  @Get('/history/:userId')
  async historyList(
    @Param('userId') userId: string,
    @Query('page') page: string,
    @Query('size') size: string,
  ) {
    const data = await this.productService.getHistoryList(
      userId,
      parseInt(page),
      parseInt(size),
    );
    return data;
  }

  @Get('/similar/:productId')
  async similarInfo(@Param('productId') productId: string) {
    const data = await this.productService.getSimilarInfo(productId);
    return data;
  }

  @Get('filter')
  async filterlist(@Query('query') query: string) {
    const data = await this.productService.getFilterlist(query);
    return data;
  }

  @GrpcMethod('ProductService', 'GetProductInfo')
  async getProductInfo(request: GRPCProductInfoRequest) {
    const response = await this.productService.getProductFromIds(request);
    return response;
  }
}
