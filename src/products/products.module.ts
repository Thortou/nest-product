import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { categories } from 'src/categories/entities/category.entity';

@Module({
  imports : [TypeOrmModule.forFeature([product, categories])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
