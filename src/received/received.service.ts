import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReceivedDto } from './dto/create-received.dto';
import { UpdateReceivedDto } from './dto/update-received.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { received } from './entities/received.entity';
import { Repository } from 'typeorm';
import { product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReceivedService {

  constructor(
    @InjectRepository(received)
    private receivedRepository: Repository<received>,
    @InjectRepository(product)
    private prodRepository: Repository<product>
  ) { }

  // async create( receivedFiel:{Reqty: number, ReDate: Date, ProductProdId: number}[] ): Promise<Received> {
  async create(createReceives: CreateReceivedDto, user: User): Promise<received> {

    const receives = new received();
    receives.Reqty = createReceives.Reqty;
    receives.ReDate = createReceives.ReDate;
    receives.ProdId = createReceives.ProdId;
    receives.user = user;
    const filterProduct = await this.prodRepository.findOne({ where: { ProdId: receives.ProdId } })

    if (!filterProduct) {
      throw new NotFoundException(`${receives.ProdId} not found`)
    }
    // //ຈຳນວນຂອງສິນຄ້າທັງໝົດ ບວກ ໃຫ້ຈຳນວນນຳເຂົ້າສິນຄ້າ
    filterProduct.qty = filterProduct.qty += Number(receives.Reqty);
    await this.prodRepository.save(filterProduct)

    return await this.receivedRepository.save(receives); 
  }
  //*********findAll*********** */
  async findAll(): Promise<received[]> { 

    return this.receivedRepository.find({ relations: ['product', 'user'] });
  }
  //********findOne****** */
  findOne(ReId: number): Promise<received> {
    return this.receivedRepository.findOne({ where: { ReId }, relations: ['product', 'user'] });
  }
  //update**** received
  update(ReId: number, updateReceivedDto: UpdateReceivedDto) {
    return this.receivedRepository.update(ReId, updateReceivedDto);
  }
  //delete data in Received
  async remove(ReId: number): Promise<any> {
    const getfindOno = await this.receivedRepository.findOne({ where: { ReId }, relations: ['Product'] })
    if (!getfindOno) {
      return { status: 500, message: "not found..." }
    }
    const product = await this.prodRepository.findOne({
      where: { ProdId: getfindOno.product.ProdId }
    });
    product.qty -= getfindOno.Reqty;
    await this.prodRepository.save(product)
    await this.receivedRepository.delete(ReId);
  }
}
