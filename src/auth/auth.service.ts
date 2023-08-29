import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        ) {}
    async validateUser(username:string, password: string): Promise<any>{
        const users = await this.userService.findOneUser(username)
        if(users && await bcrypt.compare(password, users.Password)){
            const {Password, ...result} = users
            return result;
        }
        
        return null
    }

    async signIn(user: any) {
        const payload = { 
            UserId: user.UserId, 
            UserName: user.UserName, 
            Gmail: user.Gmail, 
            Tel: user.Tel,
            roles: user.has}
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
