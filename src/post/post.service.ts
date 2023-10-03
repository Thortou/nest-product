import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { LessThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(@InjectRepository(PostEntity)
  private userRepository: Repository<PostEntity>
  ) { }

  create( content: string,startDate: Date, endDate: Date, file: Express.Multer.File): Promise<PostEntity> {
    const upload = new PostEntity()
    upload.posts = file.filename
    upload.content = content
    upload.startDate = startDate;
    upload.endDate = endDate;
    return this.userRepository.save(upload);
  } 

  //check date expire
  // async updateStatusIfExpired() {
  //   const currentDate = new Date();
  //  const result = await this.userRepository
  //     .createQueryBuilder('post')
  //     .update(PostEntity)
  //     .set({ status: 'inactive' })
  //     .where('post.endDate < :currentDate', { currentDate })
  //     .andWhere('post.status = :activeStatus', { activeStatus: 'inAtive' })
  //     .execute();
      
  //     return result
  // }

  async updateStatusIfExpired() {
    const currentDate = new Date();
    const expiredBanners = await this.userRepository.find({
      where: {
        endDate: LessThan(currentDate),
        status: 'active',
      },
    });

    for (const banner of expiredBanners) {
      banner.status = 'inActive';
     const result = await this.userRepository.save(banner);
     return result
    }
  }
//end check

  findAll(): Promise<PostEntity[]> {
    const post = this.userRepository.find();
    return post
  }

  async getImageById(id: number): Promise<PostEntity> {
    return this.userRepository.findOne({where: {id}});
  }


  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
