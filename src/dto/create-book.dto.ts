import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsOptional()
    summary?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1000, { message: 'Publication year must be a 4-digit number' })
    @Max(new Date().getFullYear(), {
        message: 'Publication year cannot be in the future',
    })
    publicationYear: number;
}
