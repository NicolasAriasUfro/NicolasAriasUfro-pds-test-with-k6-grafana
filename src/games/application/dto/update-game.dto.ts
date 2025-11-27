import { IsString, IsNotEmpty, IsDate, IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateGameDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    genre?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    platform?: string;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    releaseDate?: Date;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;
}
