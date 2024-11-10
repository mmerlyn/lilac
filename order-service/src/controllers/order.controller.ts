import { Controller, Body, Get, Param, Post, Delete } from '@nestjs/common';
import { CartRequestDTO, deleteRequestDTO } from 'src/dto/request.dto';
import { OrderService } from 'src/services/order.service';

@Controller('/order')
export class OrderController {
  constructor(readonly orderService: OrderService) {}

  @Post('/cart/add')
  async addToCart(@Body() request: CartRequestDTO) {
    const data = await this.orderService.addToCart(request);
    return data;
  }

  @Delete('/cart')
  async deleteFromCart(@Body() request: deleteRequestDTO) {
    const data = await this.orderService.deleteFromCart(request);
    return data;
  }

  @Get('/cart/:userId')
  async getCartItems(@Param('userId') userId: string) {
    const response = await this.orderService.getCartItems(userId);
    return response;
  }
}
