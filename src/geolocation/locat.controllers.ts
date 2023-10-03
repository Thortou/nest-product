import { Controller, Get, Param } from '@nestjs/common';
import { GeocodingService } from './geocoding.service';

@Controller('location')
export class LocatController {
  constructor(private readonly geocodingService: GeocodingService) {}

  @Get(':lat/:lng') 
  async getLocation(@Param('lat') lat: number, @Param('lng') lng: number): Promise<any> {
    return this.geocodingService.getProvinceFromCoordinates(lat, lng);
  }
}