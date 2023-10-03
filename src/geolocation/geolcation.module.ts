import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { LocatController } from "./locat.controllers";
import { GeocodingService } from "./geocoding.service";

@Module({
    imports: [HttpModule],
    controllers: [LocatController],
    providers: [GeocodingService],
  })
  export class LocatModule {}