import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { categories } from 'src/categories/entities/category.entity';
import { product } from 'src/products/entities/product.entity';
import { received } from 'src/received/entities/received.entity';
import { Order } from 'src/order/entities/order.entity';
import { role } from 'src/roles/entities/role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, categories, product, received, Order, role]) ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
