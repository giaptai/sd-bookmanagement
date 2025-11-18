import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from "mongoose";
import { User } from './user.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    author: string;

    @Prop()
    summary: string;
    
    @Prop({ required: true })
    publicationYear: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    createdBy: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);

// https://docs.nestjs.com/techniques/mongodb