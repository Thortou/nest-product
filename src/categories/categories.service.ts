import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { categories } from './entities/category.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class CategoriesService {
  afterInsertData() {
    throw new Error('Method not implemented!!!')
  }

 constructor(
  @InjectRepository(categories)
  private categoriesRepository: Repository<categories>,

 ){ } 

 async create(createCate: CreateCategoryDto, user: User): Promise<categories> {
  
const catename = createCate.CateName
  
  const already = await this.categoriesRepository.findOne({where: {CateName: catename}});
  
  if(already){
    throw new NotFoundException(`ຂໍອະໄພ ${catename} ມີແລ້ວ!!!`)
    
  }
const categories = this.categoriesRepository.create({
  CateName: catename, user
})
  return await this.categoriesRepository.save(categories)
 } 
 
  findAll(user: User):Promise<categories[]> {
    return this.categoriesRepository.find({where: {user}, relations: ['user']}) ;
  }

  findOne(CateId: number): Promise<categories> {
    return this.categoriesRepository.findOne({where: {CateId}});
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
