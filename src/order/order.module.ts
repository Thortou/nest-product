import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { product } from 'src/products/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Order, product])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
