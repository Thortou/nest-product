import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (
        private configService: ConfigService
        ){ 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignorExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        })
     }

     async validate(playload: any) {
        return { 
            UserId: playload.UserId, 
            UserName: playload.UserName, 
            Gmail: playload.Gmail, 
            Tel: playload.Tel,
            roles: playload.roles}
     }
}