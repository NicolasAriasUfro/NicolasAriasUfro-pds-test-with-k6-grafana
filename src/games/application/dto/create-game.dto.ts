import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsString()
  @IsNotEmpty()
  platform: string;

  @Type(() => Date)
  @IsDate()
  releaseDate: Date;

  @IsNumber()
  @Min(0)
  price: number;
}
