export class CartRequestDTO {
  userId: string;
  productId: string;
  quantity: number;
}

export class deleteRequestDTO {
  userId: string;
  productId: string;
}

export class GRPCProductInfoRequest {
  productIds: Array<string>;
}
