import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from './entities/location.entity';
import { Repository } from 'typeorm';
import { resolve } from 'dns';
import { User } from 'src/users/entities/user.entity';

// import { Client } from '@google/maps';
import * as Client from '@google/maps';
import { promisify } from 'util';
// import { Client } from '@googlemaps/google-maps-services-js';

@Injectable()
export class LocationService {
  private googleMapsClient: Client;

  constructor() {
    this.googleMapsClient = new Client.createClient({key: 'AIzaSyARlwwctYcKsHNnEci4mDrR9ICgwx7K9SA'});
  }

  async getAddressFromCoordinates(lat: number, lng: number): Promise<string> {
    const reverseGeocodePromise = promisify(this.googleMapsClient.reverseGeocode);
    const response = await reverseGeocodePromise({
      latlng: [lat, lng],
    })   
    if (response.json.results && response.json.results.length > 0) {
      const resu = response.json.results[1].address_components;

      const filteredObjects = resu.filter((component) =>
      component.types.includes("administrative_area_level_1")
    );
    const dataObject = filteredObjects[0].long_name
    console.log(dataObject);
      return response.json.results
      
    } 

    throw new NotFoundException('Address not found');
  }
}

// @Injectable()
// export class LocationService {
//   constructor(
//     @InjectRepository(LocationEntity)
//     private readonly LocationRepository: Repository<LocationEntity>,
//   ) { }

//   async findById(id: number): Promise<LocationEntity | undefined> {
//     return this.LocationRepository.findOne({ where: { id } });
//   }

//   // async updateLocationPermission(userId: number, permission: boolean): Promise<void> {
//   //   await this.LocationRepository.update(userId, { locationPermission: permission });
//   // }

//   async create (create: any, user:User): Promise<string> {
//    fetch("https://ipapi.co/json")
//     .then((response) => response.json())
//     .then(async (data) => {
       
//       const locat = new LocationEntity()
//       locat.latitude = data.latitude;
//       locat.longitude = data.longitude;
//       locat.locationName = data.city
//       locat.user = user
//       await this.LocationRepository.save(locat)
//     })
//     return 'success'

    
//     // if ("geolocation" in navigator) {
//     //   navigator.geolocation.getCurrentPosition(function(position) {
//     //     const { latitude, longitude } = position.coords;
//     //     console.log(latitude, longitude);
//     //     console.log(navigator);
        
//     //     // Send latitude and longitude to your Nest.js server
//     //     // You can use a POST request to send the data
//     //   });
//     // } else {
//     //   console.log("Geolocation is not available in this browser.");
//     // }
//   }

//   async findAll (): Promise<LocationEntity[]>{
//     return this.LocationRepository.find({relations: ['user']})
//   }
//   // findOne(id: number) {
//   //   return `This action returns a #${id} location`;
//   // }

//   // update(id: number, _updateLocationDto: UpdateLocationDto) {
//   //   return `This action updates a #${id} location`;
//   // }

//   // remove(id: number) {
//   //   return `This action removes a #${id} location`;
//   // }
// }
