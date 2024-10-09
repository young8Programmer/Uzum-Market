import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Price must be a valid number' })
  price: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Category ID must be a number' })
  @IsPositive({ message: 'Category ID must be a positive number' })
  category_id: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Stock quantity must be a number' })
  stock_quantity: number;

  @IsOptional()
  @IsString()
  optional_field?: string;
}
