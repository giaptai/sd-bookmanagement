import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsNumber()
  @Min(1000, { message: 'Publication year must be a 4-digit number' })
  @Max(new Date().getFullYear(), {
    message: 'Publication year cannot be in the future',
  })
  publicationYear?: number;
}
