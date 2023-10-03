import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Request,
  UseGuards
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { LocationEntity } from './entities/location.entity';

@Controller('/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('reqlocation')
  requestAccessLocationUser(@Body() requestAccess: any) {
    const {lat, lng} = requestAccess;
    return this.locationService.getAddressFromCoordinates(lat, lng)
  }
  // @UseGuards(JwtAuthGuard)
  // @Post()
  // create(@Body() createLocationDto: any,
  // @Request() {user}: any) {
  //   return this.locationService.create(createLocationDto, user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // findAll(): Promise<LocationEntity[]> {
  //   return this.locationService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.locationService.findById(+id);
  // }

  // @Patch('request-permission')
  // async requestLocationPermission(@Req() req): Promise<string> {
  //   const id = req.Body.id; // Assuming you have an authenticated user object

  //   await this.locationService.updateLocationPermission(id, true);
    
  //   return 'Location permission granted!';
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.locationService.remove(+id);
  // }
}
