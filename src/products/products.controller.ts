import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { product } from './entities/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Request() {user}: any) 
    { 
    // const { ProdName, qty, sprice, bprice, categoriesCateId } = createProductDto;
    return this.productsService.create(createProductDto, user);
  }
  
  @UseGuards(JwtAuthGuard)  
  @Get()
  findAll(@Request() {user}: any): Promise <product[]> {
    console.log(JwtAuthGuard)
    
    return this.productsService.findAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('less')
  findless(): Promise <product[]>{
    
    return this.productsService.findStill_less()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':Id')
  update(@Param('Id') Id: string, @Body() updateProductDto: UpdateProductDto) {
    this.productsService.update(+Id, updateProductDto);
    return {message:'update success fully..', status:200}
  }
  // @Put(':ProdId')
  //  async updateProduct(@Param('ProdId') ProdId: string, @Body() updatePostDto: any) {
  //   const {dataProduct} = updatePostDto;
  //   return this.productsService.update(ProdId, dataProduct);
  // }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
     this.productsService.remove(+id);
     return {status:200, message:'deleted successfully...'}
  }
}
