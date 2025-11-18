import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
    ADMIN = 'ADMIN',
    STUDENT = 'STUDENT',
}

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    firstname: string;

    @Prop({ required: true })
    lastname: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    phone: string;

    @Prop()
    nationality: string;

    @Prop({ required: true })
    birthday: Date;

    @Prop({ type: String, enum: UserRole, default: UserRole.STUDENT })
    role: string;
    
    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);