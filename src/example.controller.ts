import { Controller, Get, Query, ParseFloatPipe } from '@nestjs/common';
import { GeocodingService } from './example.service';

@Controller('exple')
export class LocationController {
  constructor(private readonly geocodingService: GeocodingService) {}

  @Get('province')
  getProvinceByLatLng(
    @Query('lat', new ParseFloatPipe()) lat: number,
    @Query('lng', new ParseFloatPipe()) lng: number,
  ) {
    return this.geocodingService.getProvinceByLatLng(lat, lng);
  }
}