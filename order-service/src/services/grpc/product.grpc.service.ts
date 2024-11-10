import { Inject, Injectable } from '@nestjs/common';
import { Observable, firstValueFrom } from 'rxjs';
import { GRPCProductInfoResponseDTO } from 'src/dto/response.dto';
import { GRPCProductInfoRequest } from 'src/dto/request.dto';
import { ClientGrpc } from '@nestjs/microservices';

interface ProductGRPCClient {
  GetProductInfo: (
    data: GRPCProductInfoRequest,
  ) => Observable<GRPCProductInfoResponseDTO>;
}

@Injectable()
export class ProductGrpcService {
  private ProductClient: ProductGRPCClient;

  constructor(@Inject('ProductGRPC') private client: ClientGrpc) {}

  onModuleInit() {
    this.ProductClient =
      this.client.getService<ProductGRPCClient>('ProductService');
  }

  async GetProductInfo(request: GRPCProductInfoRequest) {
    try {
      const response: GRPCProductInfoResponseDTO = await firstValueFrom(
        this.ProductClient.GetProductInfo(request),
      );
      if (!response.status) throw new Error('remote request failed');
      return response.productList;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
