// src/geocoding/geocoding.service.ts

import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GeocodingService {
  constructor(private readonly httpService: HttpService) {}

  async getProvinceFromCoordinates(lat: number, lng: number): Promise<string | null> {
    const apiKey = 'AIzaSyAm0NJ3W5AWhzUHI_4dg10c-b_iRhDQgnQ';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response: AxiosResponse<any> = await this.httpService.get(apiUrl).toPromise();
      const results = response.data.results;

      // Find the first result that has a 'administrative_area_level_1' type (province)
      const provinceResult = results.find((result: any) => {
        return result.types.includes('administrative_area_level_1');
      });

      if (provinceResult) {
        // Extract the province name
        const province = provinceResult.address_components.find((component: any) => {
          return component.types.includes('administrative_area_level_1');
        });

        return province ? province.long_name : null;
      }
console.log(apiUrl);

      return null;
    } catch (error) {
      throw new Error(`Unable to retrieve location data: ${error.message}`);
    }
  }
}
