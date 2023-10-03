// geocoding.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class GeocodingService {
  private readonly apiKey: string;
  private readonly geocodingUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('AIzaSyAm0NJ3W5AWhzUHI_4dg10c-b_iRhDQgnQ'); // Replace with your API key
  }

  getProvinceByLatLng(lat: number, lng: number): Observable<any> {
    const params = {
      latlng: `${lat},${lng}`,
      key: this.apiKey,
    };
console.log(this.apiKey);

    return this.httpService.get(this.geocodingUrl, { params });
  }
}
