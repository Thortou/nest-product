import { Injectable, NotFoundException } from '@nestjs/common';
import { product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { categories } from 'src/categories/entities/category.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService { 

  constructor(
    @InjectRepository(product)
    private productRepository: Repository<product>,

  ) { }

  async create(createProd: CreateProductDto, user:User ): Promise<product> {


    const Product = new product();
    Product.ProdName = createProd.ProdName; 
    Product.qty = createProd.qty;
    Product.sprice = createProd.sprice;
    Product.bprice =createProd. bprice; 
    Product.CateId = createProd.CateId; 
    Product.user = user;
    console.log(Product);
    
    
    return await this.productRepository.save(Product);
  }
 
  async findAll(user: User): Promise<product[]> {
    return this.productRepository.find({ where: {user}, relations: ['categories', 'user'] });
  }

  async findStill_less():Promise<product[]>{
    
    const still_less = await this.productRepository.find({where: {qty: LessThanOrEqual(5)}})
    return still_less
  }

  findOne(ProdId: number) {
    return this.productRepository.findOne({ where: { ProdId }, relations: ['categories'] })
  }

  update(ProdId: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(ProdId, updateProductDto)
  }
  async remove(ProdId: number): Promise<void> {
    await this.productRepository.delete(ProdId);
  }
}
