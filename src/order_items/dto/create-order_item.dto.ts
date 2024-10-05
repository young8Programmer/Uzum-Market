import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDecimal,
  IsPositive,
} from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  order_id: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2' })
  price: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  number?: number;
}
