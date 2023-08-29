import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(product)
    private productRepository: Repository<product>,
  ) { }

  //insert into data in Order
  async create(Orderqty: number, OrderDate: Date, productProdId: number, user:User): Promise<Order> {

    const prod = new product
    prod.ProdId = productProdId

    const orders = new Order();
    orders.Orderqty = Orderqty;
    orders.OrderDate = OrderDate;
    orders.Product = prod;
    orders.user = user;
 
    const productQty = await this.productRepository.findOne({ where: orders.Product });
    // console.log(typeof(orders.Orderqty))

    if (productQty.qty <= 5) {
      throw new NotFoundException(`ສິນຄ້າບໍ່ພໍຂາຍ`)
    }
    if (productQty.qty < orders.Orderqty) {
      throw new NotFoundException(`${productQty.ProdName}ບໍ່ພໍຂາຍ ກະລຸນາປ້ອນຈຳນວນໜ້ອຍກວ່າ ${productQty.qty}`);
    }
    productQty.qty -= orders.Orderqty
    await this.productRepository.save(productQty)
    return await this.orderRepository.save(orders);
  }

  //findAll data in Order
  findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['Product', 'user'] });
  }

  findOne(OrderId: number) {
    return this.orderRepository.findOne({ where: { OrderId }, relations: ['Product'] });
  }
  //update data
  async update(OrderId: number, Orderqty: number, OrderDate: Date): Promise<any> {

    const updateOrder = new Order()
    updateOrder.Orderqty = Orderqty,
      updateOrder.OrderDate = OrderDate

    const dataUpdate = await this.orderRepository.findOne({ where: { OrderId }, relations: ['Product'] })
    const prodqty = await this.productRepository.findOne({ where: { ProdId: dataUpdate.Product.ProdId } })


    let qtynew = Number(updateOrder.Orderqty);
    let qtyold = Number(dataUpdate.Orderqty);
    // console.log(qtynew)  
    if (prodqty.qty < 5) {
      throw new NotFoundException(`ສິນຄ້າບໍ່ພໍຂາຍ`)
    }

    if (qtynew > prodqty.qty) {
      throw new NotFoundException(`ຈຳນວນສິນຄ້າຍັງເຫຼືອໜ້ອຍກວ່າ ${qtynew}`)
    }

    if (qtyold < qtynew) {
      var resultA = qtynew -= qtyold;
      prodqty.qty -= resultA
      await this.productRepository.save(prodqty)
      Object.assign(dataUpdate, updateOrder)

      return this.orderRepository.save(dataUpdate)

    } else if (qtyold > qtynew) {
      var resultB = qtyold -= qtynew;
      prodqty.qty += resultB

      await this.productRepository.save(prodqty)
      Object.assign(dataUpdate, updateOrder)
      
      return this.orderRepository.save(dataUpdate)
    }
  }
  //delete data
  async remove(OrderId: number): Promise<any> {
    const productid = await this.orderRepository.findOne({ where: { OrderId }, relations: ['Product'] })
    const updateProdqty = await this.productRepository.findOne({
      where: { ProdId: productid.Product.ProdId }
    })

    updateProdqty.qty += productid.Orderqty;
    await this.productRepository.save(updateProdqty)

    return this.orderRepository.delete(OrderId);
  }
}
