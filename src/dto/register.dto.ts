import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { UserRole } from "../schemas/user.schema";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    nationality?: string;

    @IsDateString()
    @IsNotEmpty()
    birthday: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)/,{
        message: 'Password must contain at least 1 letter and 1 number'
    })
    password: string;
}