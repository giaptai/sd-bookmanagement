import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Book, BookDocument } from "../schemas/book.schema";
import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModal: Model<BookDocument>
    ) { }

    async create(createBookDto: CreateBookDto, userId: string) {
        const book = new this.bookModal({ ...createBookDto, createdBy: userId });
        return book.save();
    }

    async findAll(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [book, total] = await Promise.all([
            this.bookModal.find().skip(skip).limit(limit).populate('createdBy', 'firstname lastname email').exec(),
            this.bookModal.countDocuments().exec(),
        ]);

        return {
            data: book,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string) {
        const book = await this.bookModal.findById(id).populate('createdBy', 'firstname lastname email').exec();
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        return book;
    }

    async update(id: string, updateBookDto: UpdateBookDto) {
        const book = await this.bookModal.findByIdAndUpdate(id, updateBookDto, { new: true }).populate('createdBy', 'firstname lastname email').exec();
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        return book;
    }


    async remove(id: string) {
        const book = await this.bookModal.findByIdAndDelete(id);

        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        return {
            message: 'Book deleted successfully',
            book,
        };
    }
}
