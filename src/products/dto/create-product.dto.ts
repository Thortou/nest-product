import { product } from "../entities/product.entity";

export class CreateProductDto {
    static getRepository(product: product) {
      throw new Error('Method not implemented.');
    }
    ProdId: number;
    ProdName: string;
    qty: number;
    bprice: number;
    sprice:number;
    CateId: number;
}
