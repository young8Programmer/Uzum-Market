import { IsNotEmpty, IsNumber, IsString, Min, MaxLength, MinLength, IsOptional, IsPositive } from "class-validator";


export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Name is too short. Minimum length is 3 characters.' })
  @MaxLength(100, { message: 'Name is too long. Maximum length is 100 characters.' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Description is too short. Minimum length is 10 characters.' })
  @MaxLength(500, { message: 'Description is too long. Maximum length is 500 characters.' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Price cannot be negative.' })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive({ message: 'Category ID must be a positive number.' })
  category_id: number;


  @IsNotEmpty()
  @IsNumber({}, { message: 'Stock quantity must be a number' })
  stock_quantity: number;

  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Optional field cannot exceed 50 characters.' })

  optional_field?: string;
}
