import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards, ValidationPipe } from "@nestjs/common";
import { BookService } from "./book.service";
import { UserRole } from "../schemas/user.schema";
import { Roles } from "../common/decorators/roles.decorator";
import { CreateBookDto } from "../dto/create-book.dto";
import { UpdateBookDto } from "../dto/update-book.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";

@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookController {
    constructor(
        private readonly bookService: BookService
    ) { }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.STUDENT)
    async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const limitNum = limit ? parseInt(limit, 10) : 10;
        return this.bookService.findAll(pageNum, limitNum);
    }

    @Get(':id')
    @Roles(UserRole.ADMIN, UserRole.STUDENT)
    async findOne(@Param('id') id: string) {
        return this.bookService.findOne(id);
    }

    @Post()
    @Roles(UserRole.ADMIN)
    async create(@Body(ValidationPipe) createBookDto: CreateBookDto, @Request() req) {
        return this.bookService.create(createBookDto, req.user.userId);
    }

    @Put(':id')
    @Roles(UserRole.ADMIN)
    async update(@Param('id') id: string, @Body(ValidationPipe) updateBookDto: UpdateBookDto) {
        return this.bookService.update(id, updateBookDto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    async remove(@Param('id') id: string) {
        return this.bookService.remove(id);
    }
}