import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  
  @Post()
  create(
    @Body() createOrderDto: any,
    @Request() {user}: any
    ) {
    const {Orderqty, OrderDate, productProdId} = createOrderDto;
    return this.orderService.create(Orderqty, OrderDate, productProdId, user);
  } 

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateOrderDto: any) {
    const {OrderId, Orderqty, OrderDate} = updateOrderDto;
    return this.orderService.update(OrderId, Orderqty, OrderDate);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
