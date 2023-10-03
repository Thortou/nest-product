// src/banner/banner.scheduler.ts

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PostService } from './post.service';

@Injectable()
export class BannerScheduler {
  constructor(private readonly postService: PostService) {}

  @Cron(CronExpression.EVERY_SECOND)
 
 async handleCronJob(){
    await this.postService.updateStatusIfExpired();
    
  }
  
}
