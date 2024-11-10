import { ObjectId } from 'mongodb';

export class ProductInfoDTO {
  productId: string;
  title: string;
  listPrice: number;
  discount: number;
  sellingPrice: number;
  imageUrl: Array<string>;
  description: string;
  categoryId: string;
  subCategoryId: string;
  brand: string;
  SKU: string;
  specifications: Array<any>;

  constructor(
    productId: ObjectId,
    title: string,
    listPrice: number,
    discount: number,
    imageUrl: Array<string>,
    description: string,
    categoryId: ObjectId,
    subCategoryId: ObjectId,
    brand: string,
    SKU: string,
    specifications: Array<any>,
  ) {
    this.productId = productId.toString();
    this.title = title;
    this.SKU = SKU;
    this.listPrice = listPrice;
    this.sellingPrice = listPrice - discount;
    this.discount = discount;
    this.imageUrl = imageUrl;
    this.description = description;
    this.categoryId = categoryId.toString();
    this.subCategoryId = subCategoryId.toString();
    this.brand = brand;
    this.specifications = specifications;
  }
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
    productId: ObjectId,
    title: string,
    listPrice: number,
    discount: number,
    imageUrl: Array<string>,
    categoryId: ObjectId,
    subCategoryId: ObjectId,
    brand: string,
  ) {
    this.productId = productId.toString();
    this.title = title;
    this.listPrice = listPrice;
    this.discount = discount;
    this.imageUrl = imageUrl[0];
    this.categoryId = categoryId.toString();
    this.subCategoryId = subCategoryId.toString();
    this.brand = brand;
  }
}

export class wishlistResponseDTO {
  done: boolean;
  constructor(done: boolean) {
    this.done = done;
  }
}

export class GRPCProductInfoResponseDTO {
  productList: Array<ProductListInfoDTO>;
  status: boolean;
}
