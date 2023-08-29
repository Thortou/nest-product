import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ReceivedService } from './received.service';
import { CreateReceivedDto } from './dto/create-received.dto';
import { UpdateReceivedDto } from './dto/update-received.dto';
import { received } from './entities/received.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('received')
export class ReceivedController {
  constructor(private readonly receivedService: ReceivedService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createReceivedDto:CreateReceivedDto,
    @Request() {user}: any
    ) {
    return this.receivedService.create( createReceivedDto, user);

    // return {status:200, message:"create successfully..."}
  }

  @Get() 
  findAll(): Promise<received[]> {
    return this.receivedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receivedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceivedDto: UpdateReceivedDto) {
    return this.receivedService.update(+id, updateReceivedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.receivedService.remove(+id);
    return {statusCode:200, message:"delete received successfully..."}
  }
}
