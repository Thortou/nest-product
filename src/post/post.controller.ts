import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, NotFoundException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './config-posts/config.posts';
import { Response } from 'express'; 
import * as path from 'path'; 

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('posts', multerOptions))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: any
    ) {
      const {content, startDate, endDate} = createPostDto
      // console.log(file);
      
    return this.postService.create(content, startDate, endDate, file);
  }

 
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    try {
      const imageId = parseInt(id, 10);
      const image = await this.postService.getImageById(imageId);

     
      // You can replace this with your image serving logic.
      const imagePath = path.join(__dirname, '..', '../src/img', image.posts); 
      res.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Internal Server Error');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
