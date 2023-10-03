import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ReceivedModule } from './received/received.module';
import { OrderModule } from './order/order.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PostModule } from './post/post.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LocationModule } from './location/location.module';
import { HttpModule } from '@nestjs/axios';
import { LocatModule } from './geolocation/geolcation.module';
import { GeocodingService } from './example.service';
import { LocationController } from './example.controller';
 
@Module({  
  imports: [
    HttpModule,
    LocationModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`]
    }), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],  
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
            type:'postgres',
            autoLoadEntities: true,  
            synchronize: true,
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
        }
      }
    }),
    CategoriesModule,
    ProductsModule,
    ReceivedModule,
    OrderModule,
    UsersModule,
    AuthModule,
    RolesModule,
    PostModule,
    LocationModule,
    LocatModule
  ],
  controllers: [LocationController],
  providers: [GeocodingService],
})
export class AppModule { }
