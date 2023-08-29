import { IsNotEmpty, Matches } from "class-validator";

export class CreateUserDto {
    UserId: number;
    @IsNotEmpty()
    UserName: string;

    @IsNotEmpty()
    Gmail : string;

    @IsNotEmpty()
    @Matches(/^.{8,}$/, {
        message: "Your Phone number matches 8 or more..."
    })
    Tel : string ;

    @IsNotEmpty()
    @Matches(/^.{6,}$/, {
        message: "Your Password Minimum eight in length 6 or More..."
    })
    Password: string;
}
