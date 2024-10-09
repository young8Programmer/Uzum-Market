import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'Product ID must be a number' })
  @IsPositive()
  product_id: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'User ID must be a number' })
  @IsPositive()
  user_id: number;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Rating must be a number' })
  @IsPositive()
  rating: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  comment: string;
}
