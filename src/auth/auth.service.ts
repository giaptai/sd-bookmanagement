import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../schemas/user.schema";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "../dto/register.dto";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,

        private jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto) {
        const { email, password, birthday, ...rest } = registerDto;

        //check if email already exists
        const existsUser = await this.userModel.findOne({ email }).exec();
        if (existsUser) {
            throw new ConflictException('Email already used');
        }

        // validate age >= 13
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 13) {
            throw new BadRequestException('User must be at least 13 years old');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new this.userModel({
            ...rest,
            email: email.toLowerCase(),
            birthday: birthDate,
            password: hashedPassword,
        });

        await user.save();

        // Return user without password
        const { password: _, ...result } = user.toObject();
        return {
            message: 'User registered successfully',
            user: result,
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        //find user's email
        const user = await this.userModel.findOne({ email: email.toLowerCase() }).exec();

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        //check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // generate JWT token
        const payload = {
            sub: user._id,
            email: user.email,
            role: user.role,
        };
        const accessToken = this.jwtService.sign(payload);

        return {
            message: 'Login successful',
            accessToken,
            user: {
                id: user._id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
            },
        };
    }
}
