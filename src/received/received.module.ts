import { Module } from '@nestjs/common';
import { ReceivedService } from './received.service';
import { ReceivedController } from './received.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { received } from './entities/received.entity';
import { product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([received, product])],
  controllers: [ReceivedController],
  providers: [ReceivedService],
})
export class ReceivedModule {}
