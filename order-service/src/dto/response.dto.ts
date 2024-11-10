import { ObjectId } from 'mongodb';

export class CartResponseDTO {
  done: boolean;
  constructor(done: boolean) {
    this.done = done;
  }
}

export class GRPCProductInfoResponseDTO {
  productList: Array<ProductListInfoDTO>;
  status: boolean;
}

export class ProductListInfoDTO {
  productId: string;
  title: string;
  listPrice: number;
  discount: number;
  imageUrl: string;
  categoryId: string;
  subCategoryId: string;
  brand: string;

  constructor(
    productId: string,
    title: string,
    listPrice: number,
    discount: number,
    imageUrl: string,
    categoryId: string,
    subCategoryId: string,
    brand: string,
  ) {
    this.productId = productId;
    this.title = title;
    this.listPrice = listPrice;
    this.discount = discount;
    this.imageUrl = imageUrl;
    this.categoryId = categoryId;
    this.subCategoryId = subCategoryId;
    this.brand = brand;
  }
}

export class CartItemResponseDTO extends ProductListInfoDTO {
  quantity: number;
  constructor(
    productId: string,
    title: string,
    listPrice: number,
    discount: number,
    imageUrl: string,
    categoryId: string,
    subCategoryId: string,
    brand: string,
    quantity: number,
  ) {
    super(
      productId,
      title,
      listPrice,
      discount,
      imageUrl,
      categoryId,
      subCategoryId,
      brand,
    );
    this.quantity = quantity;
  }
}

export class CartListResponse {
  productList: Array<CartItemResponseDTO>;
  totalPrice: number;
  totalDiscount: number;
  constructor() {
    this.productList = [];
    this.totalPrice = 0;
    this.totalDiscount = 0;
  }
}
